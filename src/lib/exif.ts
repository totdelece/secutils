// 画像の EXIF / GPS メタデータを読み取り・除去する純粋関数。
// すべてブラウザ内（クライアント）で完結し、外部ライブラリやネットワークに依存しない。
// JPEG の APP1 セグメントに格納された TIFF 構造をパースする。

export type ExifField = {
  group: string;
  label: string;
  value: string;
  /** GPS・撮影日時・作成者など、公開時に注意すべき項目 */
  sensitive?: boolean;
};

export type ExifGps = {
  lat: number;
  lng: number;
  /** 表示用「35.658600, 139.745400」 */
  text: string;
};

export type ExifResult = {
  hasExif: boolean;
  fields: ExifField[];
  gps?: ExifGps;
};

export const EXIF_GROUP_ORDER = [
  "位置情報",
  "カメラ",
  "撮影設定",
  "日時",
  "画像",
  "その他",
] as const;

// TIFF データ型ごとのバイト長（1=BYTE 〜 12=DOUBLE）
const TYPE_SIZE: Record<number, number> = {
  1: 1,
  2: 1,
  3: 2,
  4: 4,
  5: 8,
  6: 1,
  7: 1,
  8: 2,
  9: 4,
  10: 8,
  11: 4,
  12: 8,
};

const ORIENTATION: Record<number, string> = {
  1: "通常（0°）",
  2: "左右反転",
  3: "180°回転",
  4: "上下反転",
  5: "反時計回り90°＋反転",
  6: "時計回り90°",
  7: "時計回り90°＋反転",
  8: "反時計回り90°",
};

const EXPOSURE_PROGRAM: Record<number, string> = {
  0: "未定義",
  1: "マニュアル",
  2: "プログラムAE",
  3: "絞り優先",
  4: "シャッター優先",
  5: "クリエイティブ",
  6: "アクション",
  7: "ポートレート",
  8: "風景",
};

const METERING_MODE: Record<number, string> = {
  0: "不明",
  1: "平均",
  2: "中央重点",
  3: "スポット",
  4: "マルチスポット",
  5: "分割測光",
  6: "部分測光",
  255: "その他",
};

type IfdMap = Map<number, number[] | string>;

// JPEG の APP1(Exif) を探し、TIFF ヘッダーの開始オフセットを返す。
function findTiffStart(view: DataView): number | null {
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) return null; // SOI でなければ JPEG ではない
  let offset = 2;
  while (offset + 4 <= view.byteLength) {
    const marker = view.getUint16(offset);
    if ((marker & 0xff00) !== 0xff00) break; // マーカーが壊れている
    if (marker === 0xffda) break; // SOS（画像データ開始）。これ以降にメタデータは無い
    const size = view.getUint16(offset + 2);
    if (size < 2) break;
    if (marker === 0xffe1) {
      const h = offset + 4;
      // "Exif\0\0" で始まるか
      if (
        h + 6 <= view.byteLength &&
        view.getUint32(h) === 0x45786966 &&
        view.getUint16(h + 4) === 0x0000
      ) {
        return h + 6;
      }
    }
    offset += 2 + size;
  }
  return null;
}

function readValues(
  view: DataView,
  tiffStart: number,
  little: boolean,
  type: number,
  count: number,
  valueFieldOffset: number,
): number[] | string {
  const size = TYPE_SIZE[type] ?? 1;
  const total = size * count;
  // 4バイトに収まらない値は、値フィールドに格納された「TIFF先頭からのオフセット」を辿る
  let dataOffset = valueFieldOffset;
  if (total > 4) {
    dataOffset = tiffStart + view.getUint32(valueFieldOffset, little);
  }
  if (dataOffset < 0 || dataOffset + total > view.byteLength) {
    return type === 2 ? "" : [];
  }
  if (type === 2) {
    // ASCII（null 終端）
    let s = "";
    for (let i = 0; i < count; i++) {
      const c = view.getUint8(dataOffset + i);
      if (c === 0) break;
      s += String.fromCharCode(c);
    }
    return s.trim();
  }
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const o = dataOffset + i * size;
    switch (type) {
      case 1:
      case 7:
        out.push(view.getUint8(o));
        break;
      case 6:
        out.push(view.getInt8(o));
        break;
      case 3:
        out.push(view.getUint16(o, little));
        break;
      case 8:
        out.push(view.getInt16(o, little));
        break;
      case 4:
        out.push(view.getUint32(o, little));
        break;
      case 9:
        out.push(view.getInt32(o, little));
        break;
      case 5: {
        const num = view.getUint32(o, little);
        const den = view.getUint32(o + 4, little);
        out.push(den === 0 ? 0 : num / den);
        break;
      }
      case 10: {
        const num = view.getInt32(o, little);
        const den = view.getInt32(o + 4, little);
        out.push(den === 0 ? 0 : num / den);
        break;
      }
      case 11:
        out.push(view.getFloat32(o, little));
        break;
      case 12:
        out.push(view.getFloat64(o, little));
        break;
      default:
        out.push(view.getUint8(o));
    }
  }
  return out;
}

function readIfd(
  view: DataView,
  tiffStart: number,
  little: boolean,
  ifdOffset: number,
): IfdMap {
  const map: IfdMap = new Map();
  if (ifdOffset < 0 || ifdOffset + 2 > view.byteLength) return map;
  const count = view.getUint16(ifdOffset, little);
  for (let i = 0; i < count; i++) {
    const entry = ifdOffset + 2 + i * 12;
    if (entry + 12 > view.byteLength) break;
    const tag = view.getUint16(entry, little);
    const type = view.getUint16(entry + 2, little);
    const cnt = view.getUint32(entry + 4, little);
    if (cnt > 100000) continue; // 異常なカウントは無視
    try {
      map.set(tag, readValues(view, tiffStart, little, type, cnt, entry + 8));
    } catch {
      // 壊れたエントリはスキップ
    }
  }
  return map;
}

const getStr = (m: IfdMap, tag: number): string | null => {
  const v = m.get(tag);
  return typeof v === "string" && v.length > 0 ? v : null;
};
const getNum = (m: IfdMap, tag: number): number | null => {
  const v = m.get(tag);
  return Array.isArray(v) && v.length > 0 ? v[0] : null;
};
const round1 = (n: number): number => Math.round(n * 10) / 10;

export function parseExif(buffer: ArrayBuffer): ExifResult {
  const empty: ExifResult = { hasExif: false, fields: [] };
  let view: DataView;
  try {
    view = new DataView(buffer);
  } catch {
    return empty;
  }
  const tiffStart = findTiffStart(view);
  if (tiffStart === null || tiffStart + 8 > view.byteLength) return empty;

  const bo = view.getUint16(tiffStart);
  if (bo !== 0x4949 && bo !== 0x4d4d) return empty; // "II"(little) / "MM"(big) 以外は不正
  const little = bo === 0x4949;

  const ifd0 = readIfd(view, tiffStart, little, tiffStart + view.getUint32(tiffStart + 4, little));

  let exif: IfdMap = new Map();
  const exifPtr = ifd0.get(0x8769);
  if (Array.isArray(exifPtr) && exifPtr.length > 0) {
    exif = readIfd(view, tiffStart, little, tiffStart + exifPtr[0]);
  }
  let gps: IfdMap = new Map();
  const gpsPtr = ifd0.get(0x8825);
  if (Array.isArray(gpsPtr) && gpsPtr.length > 0) {
    gps = readIfd(view, tiffStart, little, tiffStart + gpsPtr[0]);
  }

  const fields: ExifField[] = [];
  const push = (
    group: string,
    label: string,
    value: string | number | null,
    sensitive = false,
  ) => {
    if (value === null || value === "") return;
    fields.push({ group, label, value: String(value), sensitive });
  };

  // --- 位置情報（最重要・プライバシー） ---
  let gpsResult: ExifGps | undefined;
  const latArr = gps.get(0x0002);
  const lngArr = gps.get(0x0004);
  if (
    Array.isArray(latArr) &&
    latArr.length === 3 &&
    Array.isArray(lngArr) &&
    lngArr.length === 3
  ) {
    let lat = latArr[0] + latArr[1] / 60 + latArr[2] / 3600;
    let lng = lngArr[0] + lngArr[1] / 60 + lngArr[2] / 3600;
    if (getStr(gps, 0x0001) === "S") lat = -lat;
    if (getStr(gps, 0x0003) === "W") lng = -lng;
    push("位置情報", "緯度", `${Math.abs(lat).toFixed(6)}° ${lat < 0 ? "S" : "N"}`, true);
    push("位置情報", "経度", `${Math.abs(lng).toFixed(6)}° ${lng < 0 ? "W" : "E"}`, true);
    gpsResult = { lat, lng, text: `${lat.toFixed(6)}, ${lng.toFixed(6)}` };
  }
  const alt = getNum(gps, 0x0006);
  if (alt !== null) {
    push("位置情報", "高度", `${round1(getNum(gps, 0x0005) === 1 ? -alt : alt)} m`, true);
  }
  push("位置情報", "GPS日付", getStr(gps, 0x001d), true);

  // --- カメラ ---
  push("カメラ", "メーカー", getStr(ifd0, 0x010f));
  push("カメラ", "機種", getStr(ifd0, 0x0110));
  push("カメラ", "レンズ", getStr(exif, 0xa434));
  push("カメラ", "ソフトウェア", getStr(ifd0, 0x0131));

  // --- 撮影設定 ---
  const expo = getNum(exif, 0x829a);
  if (expo !== null && expo > 0) {
    push("撮影設定", "シャッタースピード", expo < 1 ? `1/${Math.round(1 / expo)} 秒` : `${round1(expo)} 秒`);
  }
  const fn = getNum(exif, 0x829d);
  if (fn !== null && fn > 0) push("撮影設定", "絞り (F値)", `f/${round1(fn)}`);
  const iso = getNum(exif, 0x8827);
  if (iso !== null) push("撮影設定", "ISO感度", `ISO ${iso}`);
  const fl = getNum(exif, 0x920a);
  if (fl !== null && fl > 0) push("撮影設定", "焦点距離", `${round1(fl)} mm`);
  const fl35 = getNum(exif, 0xa405);
  if (fl35 !== null && fl35 > 0) push("撮影設定", "焦点距離(35mm換算)", `${Math.round(fl35)} mm`);
  const ep = getNum(exif, 0x8822);
  if (ep !== null) push("撮影設定", "露出プログラム", EXPOSURE_PROGRAM[ep] ?? `不明(${ep})`);
  const mm = getNum(exif, 0x9207);
  if (mm !== null) push("撮影設定", "測光モード", METERING_MODE[mm] ?? `不明(${mm})`);
  const flash = getNum(exif, 0x9209);
  if (flash !== null) push("撮影設定", "フラッシュ", (flash & 1) === 1 ? "発光" : "非発光");

  // --- 日時 ---
  push("日時", "撮影日時", getStr(exif, 0x9003), true);
  push("日時", "デジタル化日時", getStr(exif, 0x9004));
  push("日時", "ファイル更新日時", getStr(ifd0, 0x0132));

  // --- 画像 ---
  const w = getNum(exif, 0xa002) ?? getNum(ifd0, 0x0100);
  const h = getNum(exif, 0xa003) ?? getNum(ifd0, 0x0101);
  if (w !== null && h !== null) push("画像", "解像度 (EXIF)", `${w} × ${h} px`);
  const ori = getNum(ifd0, 0x0112);
  if (ori !== null) push("画像", "向き (Orientation)", ORIENTATION[ori] ?? `不明(${ori})`);

  // --- その他 ---
  push("その他", "作成者 (Artist)", getStr(ifd0, 0x013b), true);
  push("その他", "著作権", getStr(ifd0, 0x8298));

  return { hasExif: fields.length > 0, fields, gps: gpsResult };
}

// JPEG から個人情報を含むメタデータセグメント（APP1=Exif/XMP・APP13=IPTC・COM=コメント）を
// 取り除いた新しいバイト列を返す。画像本体（DQT/SOF/DHT/SOS 以降）は再圧縮せずそのまま温存するため
// 画質は劣化しない。解析に失敗した（壊れた）JPEG の場合は null を返す。
export function stripJpegMetadata(buffer: ArrayBuffer): Uint8Array<ArrayBuffer> | null {
  const view = new DataView(buffer);
  if (view.byteLength < 2 || view.getUint16(0) !== 0xffd8) return null;
  const src = new Uint8Array(buffer);
  const chunks: Uint8Array[] = [src.subarray(0, 2)]; // SOI
  const drop = new Set([0xffe1, 0xffed, 0xfffe]); // APP1(Exif/XMP) / APP13(IPTC/Photoshop) / COM
  let offset = 2;
  let sawSos = false;
  while (offset + 4 <= view.byteLength) {
    const marker = view.getUint16(offset);
    if ((marker & 0xff00) !== 0xff00) break;
    if (marker === 0xffda) {
      chunks.push(src.subarray(offset)); // SOS + エントロピー符号化データ + EOI をそのまま
      sawSos = true;
      break;
    }
    const size = view.getUint16(offset + 2);
    if (size < 2) break;
    const segEnd = offset + 2 + size;
    if (segEnd > view.byteLength) break;
    if (!drop.has(marker)) chunks.push(src.subarray(offset, segEnd));
    offset = segEnd;
  }
  if (!sawSos) return null;
  const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const out = new Uint8Array(totalLen);
  let p = 0;
  for (const c of chunks) {
    out.set(c, p);
    p += c.length;
  }
  return out;
}
