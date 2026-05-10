import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "xserver-vs-conoha-wing")!;

const XSERVER_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+61JSI";
const CONOHA_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SKSCY";
const XSERVER_DOMAIN_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";

function AffiliateButton({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const className =
    tone === "dark"
      ? "inline-flex w-full items-center justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white no-underline transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-auto"
      : "inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 no-underline transition hover:border-emerald-500 hover:text-emerald-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-emerald-400 sm:w-auto";

  return (
    <a
      href={href}
      rel="nofollow noopener noreferrer"
      target="_blank"
      className={className}
    >
      {children}
    </a>
  );
}

function DecisionCard({
  title,
  service,
  children,
  href,
}: {
  title: string;
  service: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="not-prose rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </div>
      <div className="mt-2 text-xl font-black text-emerald-700 dark:text-emerald-300">
        {service}
      </div>
      <div className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
        {children}
      </div>
      <div className="mt-4">
        <AffiliateButton href={href} tone="light">
          公式サイトで確認する
        </AffiliateButton>
      </div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="not-prose mt-4 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-300"
        >
          <span className="font-bold text-emerald-600 dark:text-emerald-300">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SimpleTable({
  rows,
}: {
  rows: { label: string; xserver: React.ReactNode; conoha: React.ReactNode }[];
}) {
  return (
    <div className="not-prose my-7 overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
            <th className="px-4 py-3 text-left font-bold text-slate-600 dark:text-slate-300">
              判断軸
            </th>
            <th className="px-4 py-3 text-left font-bold text-slate-950 dark:text-white">
              エックスサーバー
            </th>
            <th className="px-4 py-3 text-left font-bold text-slate-950 dark:text-white">
              ConoHa WING
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-slate-100 last:border-b-0 dark:border-white/10"
            >
              <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                {row.label}
              </td>
              <td className="px-4 py-3 leading-6 text-slate-700 dark:text-slate-300">
                {row.xserver}
              </td>
              <td className="px-4 py-3 leading-6 text-slate-700 dark:text-slate-300">
                {row.conoha}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Verdict({
  children,
  title = "結論",
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-8 rounded-lg border border-emerald-500/30 bg-emerald-50 p-5 dark:bg-emerald-400/10">
      <div className="text-sm font-black text-emerald-800 dark:text-emerald-200">
        {title}
      </div>
      <div className="mt-3 text-sm leading-7 text-slate-800 dark:text-slate-200">
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        エックスサーバーと ConoHa WING は、どちらも個人ブログ・小規模サイトの有力候補です。
        ただし、比較で見るべきなのは「どちらが速いか」だけではありません。
        本当に重要なのは、契約後に迷わないこと、更新時に驚かないこと、そして自分の運営スタイルに合っていることです。
      </p>

      <p>
        先に結論を書くと、<strong>迷っている人にはエックスサーバー</strong>、
        <strong>最初からWordPressブログを短時間で立ち上げたい人にはConoHa WING</strong>が向いています。
        この記事では、初心者が判断しやすいように「契約前の不安」「運営中の手間」「更新時のコスト感」に分けて比較します。
      </p>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
        <DecisionCard
          title="迷ったらこちら"
          service="エックスサーバー"
          href={XSERVER_URL}
        >
          10日間無料で触れるため、管理画面・WordPress・メール設定を試してから支払えます。
          長く運営するサイト、複数サイト、ビジネス用途ならこちらが堅い選択です。
        </DecisionCard>
        <DecisionCard
          title="ブログを早く始めたいなら"
          service="ConoHa WING"
          href={CONOHA_URL}
        >
          WINGパックの割引、独自ドメイン2つ無料、WordPress開設の導線が強いです。
          最初からブログ一本で始める人には分かりやすい体験です。
        </DecisionCard>
      </div>

      <Verdict title="この記事の判断基準">
        <p>
          速度ベンチマークだけでは決めません。共有サーバーは同居ユーザー、キャッシュ、テーマ、画像最適化、アクセス時間帯で体感が変わります。
          そのためこの記事では、公式スペック、料金体系、試しやすさ、運用時の分かりやすさを重視します。
        </p>
      </Verdict>

      <h2>1. まず、どちらを選ぶべきか</h2>

      <SimpleTable
        rows={[
          {
            label: "初めてのレンタルサーバー",
            xserver: "おすすめ。10日間無料で管理画面とWordPressを試せるため、失敗しにくい。",
            conoha:
              "おすすめ。WINGパックとWordPress導線が分かりやすい。ただし前払い契約の理解は必要。",
          },
          {
            label: "副業ブログを今日始めたい",
            xserver:
              "十分向いている。少し堅実寄りで、先に試してから決めたい人向け。",
            conoha:
              "かなり向いている。申込みからWordPress開設までの流れが直感的。",
          },
          {
            label: "会社・店舗・長期運営",
            xserver:
              "向いている。長期運用の安心感、サポート、管理機能を重視するなら強い。",
            conoha:
              "小規模サイトなら十分。複数人管理や堅めの運用体制は事前確認したい。",
          },
          {
            label: "複数サイト運営",
            xserver:
              "向いている。スタンダードでも500GB NVMeで余裕を取りやすい。",
            conoha:
              "サイト数が少ないなら問題なし。ベーシックは300GBなので画像量に注意。",
          },
          {
            label: "短期で試す",
            xserver:
              "強い。無料お試しがあるので、契約前に触って判断できる。",
            conoha:
              "通常料金は時間課金だが、WINGパックは前払いで途中解約不可。短期検証なら契約形態に注意。",
          },
        ]}
      />

      <h2>2. 料金は「最安値」ではなく「支払い方」で見る</h2>

      <p>
        レンタルサーバー比較で一番誤解しやすいのが料金です。キャンペーン価格、実質価格、通常価格、長期契約価格が混ざるため、
        一見すると安い方が毎年ずっと安いように見えます。しかし実際には、<strong>初回の安さ</strong>と
        <strong>更新時の支払い</strong>を分けて考える必要があります。
      </p>

      <SimpleTable
        rows={[
          {
            label: "通常の入口価格",
            xserver:
              "スタンダードは通常月額990円から。キャンペーン時は割引やキャッシュバックが出る。",
            conoha:
              "ベーシックは通常料金だと時間課金・月額上限あり。WINGパックは長期前払いで割引が大きい。",
          },
          {
            label: "初期費用",
            xserver: "0円。",
            conoha: "0円。",
          },
          {
            label: "途中解約の考え方",
            xserver:
              "無料お試し後に本契約。契約期間分の支払いは必要だが、契約前に試せる。",
            conoha:
              "WINGパックは契約期間分を一括前払い。公式注記上、契約期間中の途中解約は不可。",
          },
          {
            label: "追加費用の見え方",
            xserver:
              "公式はシンプル料金を打ち出しており、サービス維持調整費のような別建て表示ではない。",
            conoha:
              "公式料金ページでは、表示価格にサービス維持調整費10%が含まれると明記されている。",
          },
        ]}
      />

      <Verdict>
        <p>
          「まず触ってから決めたい」「支払いの見通しを単純にしたい」ならエックスサーバー。
          「ブログをやると決めていて、長期前払いで初回費用を下げたい」ならConoHa WINGです。
        </p>
      </Verdict>

      <h2>3. スペック比較は、数字の読み方が大事</h2>

      <p>
        公式ページ上の見え方では、エックスサーバーのスタンダードは500GB NVMe、
        ConoHa WINGのベーシックは300GBです。ConoHa WINGは上位プランに上げると400GB、500GBへ増えます。
        容量だけを見るならエックスサーバーのスタンダードは余裕があります。
      </p>

      <SimpleTable
        rows={[
          {
            label: "比較する代表プラン",
            xserver: "スタンダード",
            conoha: "ベーシック",
          },
          {
            label: "ディスク容量",
            xserver: "500GB NVMe",
            conoha: "300GB",
          },
          {
            label: "独自SSL",
            xserver: "無料",
            conoha: "無料",
          },
          {
            label: "自動バックアップ",
            xserver: "あり。公式機能表では過去14日分の説明あり。",
            conoha: "無料。",
          },
          {
            label: "独自ドメイン特典",
            xserver:
              "最大2つ。スタンダードは契約期間によって条件があるため要確認。",
            conoha:
              "WINGパックなら2つ無料。通常料金では対象外。",
          },
          {
            label: "サポート",
            xserver: "電話・メールサポートあり。",
            conoha: "電話・メールサポートあり。",
          },
        ]}
      />

      <p>
        ただし、スペック表だけで速度は決まりません。WordPressテーマ、プラグイン、画像サイズ、キャッシュ設定、広告タグの数で体感速度は大きく変わります。
        レンタルサーバーを変える前に、画像圧縮、不要プラグイン削除、キャッシュ設定を見直す方が効くことも多いです。
      </p>

      <h2>4. 管理画面の分かりやすさはConoHa WINGが強い</h2>

      <p>
        はじめてWordPressブログを作る人にとって、サーバー性能よりも大きい壁は「どこを押せばいいか分からない」です。
        この点で ConoHa WING は、サーバー、ドメイン、WordPress の導線がまとまっていて、初回の迷いが少ない作りです。
      </p>

      <p>
        一方、エックスサーバーは「XServerアカウント」と「サーバーパネル」の役割を理解する必要があります。
        慣れれば問題ありませんが、最初だけ少し業務ツール寄りに感じるかもしれません。
        ただし、その分、設定項目を探しやすく、長期運用では安心感があります。
      </p>

      <div className="not-prose my-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="m-0 text-base font-black text-slate-950 dark:text-white">
            ConoHa WING が向く人
          </h3>
          <CheckList
            items={[
              "WordPressブログをすぐ立ち上げたい",
              "管理画面で迷う時間を減らしたい",
              "ドメインとサーバーを一画面で扱いたい",
              "長期前払いに抵抗がない",
            ]}
          />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="m-0 text-base font-black text-slate-950 dark:text-white">
            エックスサーバーが向く人
          </h3>
          <CheckList
            items={[
              "契約前に無料で試したい",
              "複数サイトやメールも含めて長く使いたい",
              "容量に余裕を持ちたい",
              "ビジネス用途でも安心できる定番を選びたい",
            ]}
          />
        </div>
      </div>

      <h2>5. WordPressブログだけなら、どちらも合格</h2>

      <p>
        WordPressブログを1つ作るだけなら、どちらを選んでも大きな失敗にはなりにくいです。
        無料SSL、自動バックアップ、WordPressの簡単セットアップ、独自ドメイン特典など、初心者に必要な機能は両方そろっています。
      </p>

      <p>
        だからこそ、差が出るのは「自分がどこで不安になるか」です。
        設定画面で迷うのが嫌ならConoHa WING。契約前に触れないのが不安ならエックスサーバー。
        この分け方が一番実用的です。
      </p>

      <h2>6. 逆に、どちらも選ばなくていいケース</h2>

      <p>
        ここは重要です。すべてのサイトにレンタルサーバーが最適とは限りません。
      </p>

      <SimpleTable
        rows={[
          {
            label: "Next.js / React のポートフォリオ",
            xserver:
              "WordPressやPHP中心なら向く。Next.jsの本格運用なら別候補も検討。",
            conoha:
              "同じくWordPress中心。静的サイトならVercelやCloudflare Pagesも候補。",
          },
          {
            label: "APIや常駐アプリを動かしたい",
            xserver:
              "共有レンタルサーバーよりVPSの方が向く。",
            conoha:
              "共有レンタルサーバーよりVPSの方が向く。",
          },
          {
            label: "アクセス急増前提の大規模サービス",
            xserver:
              "まずは上位プランやVPS、クラウド構成を検討。",
            conoha:
              "まずは上位プランやVPS、クラウド構成を検討。",
          },
        ]}
      />

      <p>
        WordPressのブログ・メディア・会社サイトならレンタルサーバーは合理的です。
        しかし、Webアプリ開発、API、常駐プロセス、特殊なミドルウェアが必要なら、
        <Link href="/">このサイトのツール群</Link>を使う開発者にはVPSやPaaSの方が合う場合があります。
      </p>

      <h2>7. 最終結論</h2>

      <Verdict title="後悔しにくい選び方">
        <p>
          <strong>まだ迷っているなら、エックスサーバー。</strong>
          理由は単純で、10日間無料で触ってから決められるからです。
          管理画面、WordPress、メール、SSL設定を触って「自分に合うか」を見てから支払えます。
        </p>
        <p>
          <strong>ブログを始めることが決まっていて、すぐ公開したいならConoHa WING。</strong>
          WINGパックの割引とWordPress導線が強く、初回の立ち上げ体験は分かりやすいです。
        </p>
      </Verdict>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-500/25 bg-emerald-50 p-5 dark:bg-emerald-400/10">
          <h3 className="m-0 text-lg font-black text-slate-950 dark:text-white">
            迷ったらエックスサーバー
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
            無料お試しで触ってから決めたい人、長期運用・複数サイト・ビジネス用途を見ている人向け。
          </p>
          <div className="mt-4">
            <AffiliateButton href={XSERVER_URL}>
              エックスサーバーを10日間無料で試す
            </AffiliateButton>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="m-0 text-lg font-black text-slate-950 dark:text-white">
            ブログをすぐ始めるならConoHa WING
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
            WordPress開設の導線を重視し、WINGパックの長期前払いに納得できる人向け。
          </p>
          <div className="mt-4">
            <AffiliateButton href={CONOHA_URL} tone="light">
              ConoHa WINGの料金を確認する
            </AffiliateButton>
          </div>
        </div>
      </div>

      <h2>契約前チェックリスト</h2>

      <CheckList
        items={[
          "キャンペーン価格だけでなく、更新時の通常料金も確認した",
          "独自ドメイン無料特典の条件を確認した",
          "WINGパックの場合、途中解約不可であることを理解した",
          "WordPress以外のアプリを動かす予定がないか確認した",
          "メール運用、バックアップ、SSL、サポートの必要性を確認した",
        ]}
      />

      <h2>参考にした公式情報</h2>

      <ul>
        <li>
          <a
            href="https://www.xserver.ne.jp/price/"
            target="_blank"
            rel="noopener noreferrer"
          >
            エックスサーバー 料金プラン
          </a>
        </li>
        <li>
          <a
            href="https://www.xserver.ne.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            エックスサーバー 公式サイト
          </a>
        </li>
        <li>
          <a
            href="https://www.conoha.jp/pricing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ConoHa WING 料金
          </a>
        </li>
      </ul>

      <p>
        価格やキャンペーンは頻繁に変わります。この記事は2026年5月10日時点で公式ページを確認して作成していますが、
        申し込み前には必ず各公式サイトで最新条件を確認してください。
      </p>

      <h2>関連して読むと分かりやすい記事</h2>

      <ul>
        <li>
          <Link href="/learn/network/dns-basics">
            DNSの仕組みと名前解決の流れ
          </Link>
        </li>
        <li>
          <Link href="/learn/network/https-tls">
            HTTPS と TLS の仕組み
          </Link>
        </li>
        <li>
          <Link href="/learn/security/http-security-headers">
            HTTPセキュリティヘッダー詳解
          </Link>
        </li>
      </ul>

      <p>
        独自ドメインだけ先に整理したい場合は、
        <a
          href={XSERVER_DOMAIN_URL}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          XServerドメイン
        </a>
        の料金も確認しておくと、サーバー契約とドメイン取得を分けるべきか判断しやすくなります。
      </p>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www12.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SKSCY"
          width={1}
          height={1}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+61JSI"
          width={1}
          height={1}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www13.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15ORS2"
          width={1}
          height={1}
          alt=""
        />
      </div>
    </ArticleLayout>
  );
}
