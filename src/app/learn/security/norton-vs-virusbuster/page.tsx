import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "norton-vs-virusbuster")!;

const NORTON_URL = "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+61C2Q";
const NORTON_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+61C2Q";
const VB_URL = "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";
const VB_PIXEL = "https://www13.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const nortonBanner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+60H7L",
  src: "https://www26.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001010000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+60H7L",
  width: 468,
  height: 60,
  alt: "ノートン 360 公式",
};

const nortonBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+631SX",
  src: "https://www22.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001022000&mc=1",
  pixel: "https://www16.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+631SX",
  width: 300,
  height: 250,
  alt: "ノートン 360 公式",
};

const nortonBanner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001020000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+62MDD",
  width: 234,
  height: 60,
  alt: "ノートン 360 公式",
};

const vbBanner468x100: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+61Z81",
  src: "https://www29.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001017000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+61Z81",
  width: 468,
  height: 100,
  alt: "ウイルスバスター クラウド 公式",
};

const vbBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001020000&mc=1",
  pixel: "https://www12.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  width: 300,
  height: 250,
  alt: "ウイルスバスター クラウド 公式",
};

const vbBanner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+61JSH",
  src: "https://www26.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001015000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+61JSH",
  width: 234,
  height: 60,
  alt: "ウイルスバスター クラウド 公式",
};

const tldr = [
  {
    no: "01",
    title: "VPN・バックアップ・パスワード管理をまとめたいならノートン",
    body: "Norton 360 Deluxe はVPN帯域無制限・50GBバックアップ・パスワードマネージャー・ダークウェブ監視を一本に集約。別々に契約すれば月数千円かかる機能をまとめてカバーできる。",
  },
  {
    no: "02",
    title: "ネットバンキング重視・日本語サポートならウイルスバスター",
    body: "決済専用保護ブラウザ「Pay Guard」とランサムウェア対策「フォルダシールド」は国内No.1の独自機能。24時間365日日本語電話サポートも強み。",
  },
  {
    no: "03",
    title: "迷ったらノートン、国内安心感重視ならウイルスバスター",
    body: "セット機能のボリュームと60日返金保証でノートンが汎用性高め。ネットバンキングへのこだわりと日本語サポートを優先するならウイルスバスターが刺さる。",
  },
];

const comparisonRows: {
  label: string;
  norton: string;
  vb: string;
  nortonWin?: boolean;
  vbWin?: boolean;
}[] = [
  { label: "料金（最安プラン目安）", norton: "初年度割引あり（公式確認要）", vb: "初年度割引あり（公式確認要）" },
  { label: "対応台数（最安プラン）", norton: "1台（Standard）", vb: "1台（1台版）" },
  { label: "VPN", norton: "✓（Standard: 帯域制限あり / Deluxe以上: 無制限）", vb: "─", nortonWin: true },
  { label: "クラウドバックアップ", norton: "✓（Deluxe: 50GB / Premium: 100GB）", vb: "─", nortonWin: true },
  { label: "パスワードマネージャー", norton: "✓（Norton PM）", vb: "─", nortonWin: true },
  { label: "ダークウェブモニタリング", norton: "✓（メール・電話・クレカ監視）", vb: "─", nortonWin: true },
  { label: "Pay Guard（決済保護）", norton: "─", vb: "✓（ネットバンキング専用ブラウザ環境）", vbWin: true },
  { label: "フォルダシールド", norton: "─", vb: "✓（重要フォルダへの不正書き換えをブロック）", vbWin: true },
  { label: "動作の軽さ", norton: "普通", vb: "軽い（クラウド型スキャン）", vbWin: true },
  { label: "日本語電話サポート", norton: "△（チャット中心）", vb: "✓（24時間365日）", vbWin: true },
  { label: "返金保証", norton: "60日間", vb: "30日間", nortonWin: true },
  { label: "世界シェア", norton: "世界販売台数No.1", vb: "国内シェアNo.1" },
];

const useCases = [
  {
    scenario: "ネットバンキング・オンライン決済を安全に使いたい",
    recommend: "ウイルスバスター",
    color: "red" as const,
    reason: "Pay Guardが決済時のフォームデータ横取りや画面キャプチャをブロック。金融機関が特に多い日本市場向けに最適化されている。",
  },
  {
    scenario: "VPN・バックアップ・パスワード管理をまとめてコストを下げたい",
    recommend: "ノートン",
    color: "blue" as const,
    reason: "Norton 360 Deluxeひとつでこれら全てをカバー。個別に契約すれば月数千円かかる費用を一本化できる。",
  },
  {
    scenario: "サポートは電話で日本語対応が安心",
    recommend: "ウイルスバスター",
    color: "red" as const,
    reason: "24時間365日の日本語電話サポートを提供。初心者や家族の端末を管理する人に特に心強い。",
  },
  {
    scenario: "個人情報がダークウェブに流出していないか監視したい",
    recommend: "ノートン",
    color: "blue" as const,
    reason: "メール・電話番号・クレジットカードをダークウェブで継続監視し、検知時に即通知。ウイルスバスターにはない機能。",
  },
  {
    scenario: "古めのPCでも動作を軽くしたい",
    recommend: "ウイルスバスター",
    color: "red" as const,
    reason: "クラウド型スキャンで判定をサーバー側で処理するため、PCのCPU負荷が低い。定義ファイルの手動更新も不要。",
  },
  {
    scenario: "返金保証を使ってじっくり試したい",
    recommend: "ノートン",
    color: "blue" as const,
    reason: "60日間返金保証つき（ウイルスバスターは30日間）。2か月かけてVPNやバックアップの使い勝手まで確認できる。",
  },
];

const nortonStrengths = [
  {
    title: "VPN・バックアップ・パスワード管理の3点セット",
    body: "Deluxe以上で帯域無制限VPN・50GBバックアップ・Norton Password Managerが一本に。別々に契約すれば月数千円かかるサービスをまとめてカバーできる。",
  },
  {
    title: "ダークウェブモニタリング",
    body: "登録したメールアドレス・電話番号・クレジットカードがダークウェブで売買されていないかを継続監視。流出を検知したら即通知が届く。",
  },
  {
    title: "全世界5億台の脅威インテリジェンス",
    body: "グローバル規模のセンサーネットワークが新種マルウェアをいち早く検知し共有。国内専業ブランドには持てないスケールの防御力。",
  },
  {
    title: "60日間返金保証",
    body: "ウイルスバスターの30日間に対して60日間と長い。VPNやバックアップなど全機能を使い込んでから判断できる。",
  },
];

const vbStrengths = [
  {
    title: "Pay Guard（決済専用保護ブラウザ）",
    body: "ネットバンキングや決済サイトにアクセスすると専用の保護ブラウザ環境が起動。フォームデータの横取りや画面キャプチャをブロックし、金融取引を安全に実行できる。",
  },
  {
    title: "フォルダシールド（ランサムウェア対策）",
    body: "重要フォルダへの不正な書き換えをリアルタイムでブロック。ランサムウェアによるファイル暗号化を未然に防ぐ専用の保護機能で、バックアップと二重の防御が実現する。",
  },
  {
    title: "クラウド型スキャンで動作軽量",
    body: "ファイル判定の大部分をトレンドマイクロのクラウドサーバーで処理するためPCへの負荷が低い。定義ファイルの手動更新が不要で、古めのPCでも快適に使える。",
  },
  {
    title: "24時間365日日本語電話サポート",
    body: "困ったときにすぐ電話で日本語サポートを受けられる。初心者や家族の端末を管理する人にとって大きな安心感。国内シェアNo.1を支える顧客サポート体制。",
  },
];

const checklist = [
  "使用デバイスの OS が両社の対応範囲内（Windows/macOS/iOS/Android）か確認した",
  "守りたい台数に合ったプランを選び、台数超過にならないか確認した",
  "初回価格と 2 年目以降の更新価格を公式サイトで確認した",
  "ノートン選択時: VPN 帯域無制限が必要なら Deluxe 以上を選んだ",
  "ウイルスバスター選択時: Pay Guard を使うブラウザの動作確認を購入後に行う",
  "既存のセキュリティソフトをアンインストールしてから導入する",
  "家族の端末も守る場合は、複数台プランのコスト比較を行った",
];

const faqs = [
  {
    q: "ノートンとウイルスバスターを両方同時にインストールできますか？",
    a: "できません。セキュリティソフトは複数を同時にインストールすると競合が起きリアルタイム保護が正常に機能しなくなります。乗り換える場合は既存ソフトを完全にアンインストールしてから新しいソフトをインストールしてください。",
  },
  {
    q: "検知率・マルウェア対策の精度はどちらが高いですか？",
    a: "AV-TESTなどの第三者評価機関では両社ともに高い検知率を記録しており、日常的な脅威への対処能力に大きな差はありません。ノートンは全世界5億台超のセンサーネットワークによる新種マルウェアへの対応速度が強みで、ウイルスバスターはAI×クラウド型によるパターンレスの検出が特徴です。最終的な選び方は「検知率の差」より「どの付加機能が必要か」で決めるのが実用的です。",
  },
  {
    q: "乗り換えの手順はどうすればいいですか？",
    a: "（1）現在のソフトの契約期間を確認する、（2）新しいソフトを購入・アカウント作成、（3）旧ソフトをコントロールパネル（またはアプリ一覧）からアンインストール・再起動、（4）新しいソフトをインストール——の順番が基本です。アンインストール前に旧ソフト側の専用削除ツールが公式から提供されていることもあるため、公式サポートページを参照してください。",
  },
  {
    q: "Mac・スマホでも使えますか？",
    a: "両社ともWindows・macOS・iOS・Androidに対応しています。ただしOSごとに使える機能が異なります（例: ノートンのクラウドバックアップはWindows PC向け）。購入前に公式サイトでOS別の機能一覧を確認してください。",
  },
  {
    q: "2年目以降の更新価格は高くなりますか？",
    a: "両社とも初年度は大幅割引が適用されることが多く、2年目以降は通常価格（更新価格）になります。更新価格は初回より高くなるケースがほとんどです。購入前に必ず「初回価格」と「更新価格」を両方確認し、長期コストで判断してください。長期プランを選ぶと1年あたりの単価を抑えられる場合があります。",
  },
];

// ────────────────────────────────────────────────────────────
// Shared UI
// ────────────────────────────────────────────────────────────

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <div className="relative">
      <a href={ad.href} rel="nofollow noopener noreferrer" target="_blank" className="block transition hover:opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.src} alt={ad.alt} width={ad.width} height={ad.height} className="h-auto max-w-full rounded-md" />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.pixel} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
    </div>
  );
}

function CtaButton({
  href,
  children,
  variant = "solid",
  color = "blue",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  color?: "blue" | "red";
  size?: "md" | "lg";
}) {
  const solidMap = {
    blue: "bg-blue-600 text-white shadow-lg shadow-blue-950/15 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-blue-600",
    red: "bg-red-600 text-white shadow-lg shadow-red-950/15 hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-red-600",
  };
  const outlineMap = {
    blue: "border border-blue-300 bg-white text-blue-700 hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-blue-600",
    red: "border border-red-300 bg-white text-red-700 hover:-translate-y-0.5 hover:bg-red-50 focus-visible:outline-red-600",
  };
  const variantClass = variant === "solid" ? solidMap[color] : outlineMap[color];
  const sizeClass = size === "lg" ? "min-h-14 px-6 py-3.5 text-base" : "min-h-11 px-5 py-2.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl text-center font-black no-underline transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClass} ${sizeClass}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">{"→"}</span>
    </a>
  );
}

// ────────────────────────────────────────────────────────────
// Sections
// ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_60%,#ffffff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-red-200/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=security" className="hover:text-slate-950">Security</Link>
          <span>/</span>
          <span>ノートン vs ウイルスバスター</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
            PR / 広告を含みます
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
            {article.date} 確認
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
            価格は公式確認
          </span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          ノートン vs ウイルスバスター
          <span className="mt-2 block text-2xl font-black text-slate-600 sm:text-3xl">
            どちらを選ぶべきか — 機能・料金・サポートを徹底比較
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          国内外のセキュリティソフト二強を並べて比較。VPN・バックアップ・ダークウェブ監視が揃うノートンと、Pay Guard・フォルダシールド・日本語電話サポートが強みのウイルスバスター。用途に合った選び方を整理します。
        </p>

        {/* ファーストビュー: 両社カード横並び */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* ノートンカード */}
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
            <div className="bg-blue-600 px-4 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">PR / Norton 360</p>
            </div>
            <div className="p-5">
              <p className="text-lg font-black text-slate-950">ノートン 360</p>
              <p className="mt-1 text-xs text-slate-500">世界販売台数 No.1</p>
              <ul className="mt-3 space-y-1.5">
                {["VPN内蔵（帯域無制限）", "クラウドバックアップ", "ダークウェブ監視", "60日間返金保証"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center">
                <div className="hidden sm:block"><BannerImage ad={nortonBanner468x60} /></div>
                <div className="sm:hidden"><BannerImage ad={nortonBanner234x60} /></div>
              </div>
              <div className="mt-3">
                <CtaButton href={NORTON_URL} color="blue" size="lg">公式サイトを見る</CtaButton>
              </div>
            </div>
          </div>

          {/* ウイルスバスターカード */}
          <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-md">
            <div className="bg-red-600 px-4 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-100">PR / ウイルスバスター クラウド</p>
            </div>
            <div className="p-5">
              <p className="text-lg font-black text-slate-950">ウイルスバスター クラウド</p>
              <p className="mt-1 text-xs text-slate-500">国内シェア No.1</p>
              <ul className="mt-3 space-y-1.5">
                {["Pay Guard（決済保護）", "フォルダシールド（ランサム対策）", "クラウド型で動作軽量", "24時間日本語電話サポート"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[9px] font-black text-red-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center">
                <div className="hidden sm:block"><BannerImage ad={vbBanner468x100} /></div>
                <div className="sm:hidden"><BannerImage ad={vbBanner234x60} /></div>
              </div>
              <div className="mt-3">
                <CtaButton href={VB_URL} color="red" size="lg">公式サイトを見る</CtaButton>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告を含みます。価格・機能・対応 OS は記事執筆時点の情報です。最新条件は各公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={NORTON_PIXEL} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={VB_PIXEL} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
      </div>
    </section>
  );
}

function TldrSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tldr.map((item) => (
            <article
              key={item.no}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-slate-100">{item.no}</div>
              <h3 className="relative text-base font-black text-slate-950">{item.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Comparison</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">機能・仕様 比較表</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            料金は初年度割引があるため目安です。最新料金は必ず公式サイトでご確認ください。
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[540px] text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">項目</th>
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-blue-700">
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white">N</span>
                    ノートン 360
                  </span>
                </th>
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-red-700">
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[9px] font-black text-white">V</span>
                    ウイルスバスター
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={`border-b border-slate-100 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-3.5 font-bold text-slate-700">{row.label}</td>
                  <td className={`px-5 py-3.5 leading-6 ${row.nortonWin ? "font-bold text-blue-700" : "text-slate-600"}`}>
                    {row.norton}
                  </td>
                  <td className={`px-5 py-3.5 leading-6 ${row.vbWin ? "font-bold text-red-700" : "text-slate-600"}`}>
                    {row.vb}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          ※ 料金・機能・プラン内容は変更される場合があります。購入前に必ず公式サイトで最新情報をご確認ください。
        </p>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Use Cases</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">シナリオ別おすすめ</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            用途を絞って選ぶための判断基準です。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((item) => {
            const isNorton = item.color === "blue";
            return (
              <article
                key={item.scenario}
                className={`rounded-2xl border p-5 shadow-sm ${isNorton ? "border-blue-200 bg-blue-50/40" : "border-red-200 bg-red-50/40"}`}
              >
                <p className="text-xs font-black text-slate-500">{item.scenario}</p>
                <div className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${isNorton ? "bg-blue-100 text-blue-700 ring-blue-200" : "bg-red-100 text-red-700 ring-red-200"}`}>
                  {item.recommend}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.reason}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StrengthsSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Strengths</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">それぞれの強み</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ノートン */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">N</span>
              <h3 className="text-xl font-black text-slate-950">ノートン 360 の強み</h3>
            </div>
            <div className="space-y-4">
              {nortonStrengths.map((s) => (
                <article key={s.title} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                  <h4 className="text-sm font-black text-blue-700">{s.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <div className="hidden sm:block"><BannerImage ad={nortonBanner468x60} /></div>
              <div className="sm:hidden"><BannerImage ad={nortonBanner234x60} /></div>
              <div className="mt-3">
                <CtaButton href={NORTON_URL} color="blue">ノートン公式サイトを見る</CtaButton>
              </div>
            </div>
          </div>

          {/* ウイルスバスター */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">V</span>
              <h3 className="text-xl font-black text-slate-950">ウイルスバスターの強み</h3>
            </div>
            <div className="space-y-4">
              {vbStrengths.map((s) => (
                <article key={s.title} className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                  <h4 className="text-sm font-black text-red-700">{s.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <div className="hidden sm:block"><BannerImage ad={vbBanner468x100} /></div>
              <div className="sm:hidden"><BannerImage ad={vbBanner234x60} /></div>
              <div className="mt-3">
                <CtaButton href={VB_URL} color="red">ウイルスバスター公式サイトを見る</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBandSection() {
  return (
    <section className="bg-white px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
            <div className="border-b border-blue-100 bg-blue-600 px-5 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">PR / Norton 360</p>
            </div>
            <div className="p-5">
              <h3 className="text-base font-black text-slate-950">VPN・バックアップ・ダークウェブ監視が一本に</h3>
              <p className="mt-2 mb-4 text-sm leading-7 text-slate-600">
                60日間返金保証つきでセット機能を試せます。Deluxe以上ならVPN帯域無制限で使えます。
              </p>
              <div className="flex justify-center">
                <div className="hidden sm:block"><BannerImage ad={nortonBanner300x250} /></div>
                <div className="sm:hidden"><BannerImage ad={nortonBanner234x60} /></div>
              </div>
              <div className="mt-4 grid gap-2">
                <CtaButton href={NORTON_URL} color="blue" size="lg">最新キャンペーンを確認する</CtaButton>
                <CtaButton href={NORTON_URL} color="blue" variant="outline">料金・プランを見る</CtaButton>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white shadow-sm">
            <div className="border-b border-red-100 bg-red-600 px-5 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-100">PR / ウイルスバスター クラウド</p>
            </div>
            <div className="p-5">
              <h3 className="text-base font-black text-slate-950">Pay Guard・フォルダシールド・日本語サポート</h3>
              <p className="mt-2 mb-4 text-sm leading-7 text-slate-600">
                国内No.1の安心感。30日間返金保証つきでネットバンキング保護を実際に体験できます。
              </p>
              <div className="flex justify-center">
                <div className="hidden sm:block"><BannerImage ad={vbBanner300x250} /></div>
                <div className="sm:hidden"><BannerImage ad={vbBanner234x60} /></div>
              </div>
              <div className="mt-4 grid gap-2">
                <CtaButton href={VB_URL} color="red" size="lg">最新キャンペーンを確認する</CtaButton>
                <CtaButton href={VB_URL} color="red" variant="outline">料金・プランを見る</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Pre-flight</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">購入前のチェックリスト</h2>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-slate-300 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">Q</span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="text-slate-500 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalDecisionSection() {
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">Final Decision</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">結論 — こんな人に向いている</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ノートン */}
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
            <div className="bg-blue-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-blue-600">N</span>
                <p className="text-sm font-black text-white">ノートン 360 を選ぶべき人</p>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "VPN・バックアップ・パスワード管理を一本にまとめたい人",
                  "ダークウェブへの個人情報流出を継続監視したい人",
                  "世界規模の脅威インテリジェンスによる検知精度を重視する人",
                  "60日間じっくり試してから判断したい人",
                  "家族のデバイスをまとめてカバーしたい人",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <div className="hidden sm:block"><BannerImage ad={nortonBanner468x60} /></div>
                <div className="sm:hidden"><BannerImage ad={nortonBanner234x60} /></div>
              </div>
              <div className="mt-3 grid gap-2">
                <CtaButton href={NORTON_URL} color="blue" size="lg">ノートン公式サイトを見る</CtaButton>
              </div>
            </div>
          </div>

          {/* ウイルスバスター */}
          <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-md">
            <div className="bg-red-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-red-600">V</span>
                <p className="text-sm font-black text-white">ウイルスバスターを選ぶべき人</p>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "ネットバンキング・オンライン決済を安全に使いたい人",
                  "ランサムウェアからファイルを保護したい人",
                  "古めのPCでも動作を重くしたくない人",
                  "困ったときは日本語で電話サポートを使いたい人",
                  "国内シェアNo.1の安心感・実績を重視する人",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[9px] font-black text-red-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <div className="hidden sm:block"><BannerImage ad={vbBanner468x100} /></div>
                <div className="sm:hidden"><BannerImage ad={vbBanner234x60} /></div>
              </div>
              <div className="mt-3 grid gap-2">
                <CtaButton href={VB_URL} color="red" size="lg">ウイルスバスター公式サイトを見る</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {[
            ["Norton 公式サイト（日本）", "https://jp.norton.com/"],
            ["Norton 360 プラン・料金一覧", "https://jp.norton.com/products"],
            ["ウイルスバスター クラウド 公式サイト", "https://www.trendmicro.com/ja_jp/forHome/products/virusbuster.html"],
            ["ウイルスバスター Pay Guard 機能紹介", "https://www.trendmicro.com/ja_jp/forHome/products/virusbuster/features.html"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・機能・対応 OS を確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/security/norton-360-review", title: "ノートン 360 レビュー", eyebrow: "Review" },
    { href: "/learn/security/virusbuster-cloud-review", title: "ウイルスバスター クラウド レビュー", eyebrow: "Review" },
    { href: "/learn/security/ransomware-2026", title: "ランサムウェアの最新動向と対策", eyebrow: "Security" },
  ];
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-black text-slate-950">関連して読む</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{item.eyebrow}</div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-blue-700">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NortonVsVirusbusterPage() {
  return (
    <main>
      <Hero />
      <TldrSection />
      <ComparisonTableSection />
      <UseCasesSection />
      <StrengthsSection />
      <CtaBandSection />
      <ChecklistSection />
      <FaqSection />
      <FinalDecisionSection />
      <References />
      <RelatedLinks />
    </main>
  );
}
