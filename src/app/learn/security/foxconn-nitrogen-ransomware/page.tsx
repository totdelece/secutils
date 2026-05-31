import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "foxconn-nitrogen-ransomware")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>概要</h2>
      <p>
        2026年5月11日、ランサムウェアグループ「Nitrogen」がApple・NvidiaなどのサプライヤーとしてEMS（電子機器受託製造）世界最大手のFoxconnを攻撃したと主張した。標的となったのは米国ウィスコンシン州マウントプレザントおよびテキサス州ヒューストンの工場で、Nitrogenは<strong>8TB・1,100万ファイル超</strong>を窃取したとダークウェブのリークサイトに掲載した。Foxconnは5月12日に攻撃を認め、北米のサイバーセキュリティチームが対応にあたっていることを明らかにした。
      </p>
      <p>
        盗まれたとされるデータにはApple・Nvidia・Intel・Google・DellのNDA付き設計書・内部プロジェクト資料・技術図面が含まれているとされる。Foxconnは「生産継続のための運用措置を実施している」と述べるにとどめ、身代金の支払い有無については回答しなかった。
      </p>

      <h2>何が起きたのか</h2>
      <h3>攻撃の経緯</h3>
      <p>
        Foxconnによれば、5月1日頃から大規模なITアウテージが発生し、約1週間にわたって一部工場の生産が停止した。5月11日、NitrogenがダークウェブのリークサイトにFoxconnを掲載。翌5月12日、FoxconnはThe RegisterおよびWIREDの取材に対して「サイバーインシデントが発生した」と認めた。
      </p>
      <h3>公開されたデータの内容</h3>
      <p>
        Nitrogenが公開したサンプルデータには、複数の大手テクノロジー企業に関わる機密文書が含まれているとされる。Foxconnは複数の世界最大規模のテック企業の製品を受託製造しており、設計書・回路図・調達情報などが流出した場合、顧客企業の新製品情報が競合他社や国家機関に渡るリスクがある。
      </p>
      <h3>Foxconnへの繰り返しの攻撃</h3>
      <p>
        Foxconnはランサムウェアの標的となるのはこれが初めてではない。2020年11月にはDoppelPaymer、2021年5月にはREvil（REvilはその後壊滅）が攻撃を行っており、今回は3度目の大規模侵害となる。製造業としての規模の大きさとグローバルな調達ネットワークが、繰り返し攻撃者を引き寄せる要因となっている。
      </p>

      <h2>技術的なポイント</h2>
      <h3>Nitrogenランサムウェアとは</h3>
      <p>
        Nitrogenは2023年に登場したランサムウェアファミリーで、<strong>流出した「Conti v2」のビルダーコードを流用</strong>したとされる。Contiはかつて最大規模のランサムウェアグループの一つだったが、2022年にソースコードが内部告発によりリークされ、複数のグループがそれをもとに亜種を作成した。Nitrogenもその系譜に位置する。
      </p>
      <h3>致命的な欠陥: 復号できない身代金要求</h3>
      <p>
        Nitrogenには<strong>デクリプタ（復号ツール）のプログラムバグ</strong>が存在し、身代金を支払っても被害者はファイルを復元できないとされる。これはサイバーセキュリティ研究者によって確認された深刻な欠陥であり、<strong>Nitrogenに攻撃された組織が身代金を支払うことは実質的に無意味</strong>である。
      </p>
      <h3>EDR無効化の常態化</h3>
      <p>
        2026年のランサムウェア攻撃において、セキュリティ製品（EDR: Endpoint Detection and Response）を無効化するツール「EDRキラー」の使用が標準的な攻撃ステップとなっている。EDRキラーは通常、正規のドライバーの脆弱性（BYOVD: Bring Your Own Vulnerable Driver）を悪用してカーネル権限を取得し、セキュリティプロセスを強制終了する。
      </p>
      <h3>暗号化せず恐喝のみの手口</h3>
      <p>
        2026年のランサムウェア市場では、ファイルを暗号化せずに<strong>データ窃取と公開脅迫のみ</strong>を行う手口が増加している。暗号化には時間とリスクが伴うため、攻撃者が「盗んだデータを公開する」と脅すだけで身代金を要求するケースが増えている。Nitrogenの復号バグが露見している事情も、この傾向を後押しする可能性がある。
      </p>

      <h2>企業が学ぶべきポイント</h2>
      <ul>
        <li>
          <strong>身代金を払っても復号できないケースがある</strong>: Nitrogenのように復号ツールにバグがある場合、支払いは完全な損失になる。バックアップとインシデントレスポンス計画が唯一の現実的な対応手段である。
        </li>
        <li>
          <strong>製造業はサプライチェーンの機密データを意識する</strong>: 顧客企業のNDA付き設計書や技術仕様をFoxconnのような受託製造業者が大量に保持している。攻撃者が本当に狙っているのはFoxconn自身のデータではなく、その先にある顧客企業の知的財産である可能性がある。
        </li>
        <li>
          <strong>EDR・XDRの保護設定を定期的に確認する</strong>: EDRキラーによる無効化が常態化している現在、セキュリティツールが「インストールされている」だけでなく「実際に機能しているか」を定期的に検証するテストが重要になっている。
        </li>
        <li>
          <strong>オフラインバックアップの3-2-1ルール</strong>: ランサムウェアはネットワーク上のバックアップも暗号化する。3つのコピー・2種類のメディア・1つはオフラインという「3-2-1バックアップ」を確実に実施する。
        </li>
      </ul>

      <h2>影響範囲</h2>
      <table>
        <thead>
          <tr>
            <th>対象</th>
            <th>影響</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foxconn 北米工場</td>
            <td>約1週間の生産停止、設計書・内部文書の流出リスク</td>
          </tr>
          <tr>
            <td>Apple・Nvidia・Intel・Google・Dell</td>
            <td>設計書・技術図面が盗まれた可能性（各社は被害の確認中）</td>
          </tr>
          <tr>
            <td>製造業全般</td>
            <td>EMSサプライチェーン経由での知的財産流出リスクが顕在化</td>
          </tr>
        </tbody>
      </table>

      <h2>参考情報</h2>
      <ul>
        <li>The Register: <em>Foxconn confirms cyberattack after Nitrogen claims Apple, Nvidia data theft</em> (2026/05/12)</li>
        <li>9to5Mac: <em>Apple supplier Foxconn confirms ransomware attack affected North American factories</em> (2026/05/12)</li>
        <li>Securelist: <em>Reviewing the trends in ransomware attacks in 2026</em></li>
      </ul>
      <p>
        ランサムウェアの全体像は <a href="/learn/security/ransomware-2026">ランサムウェア2026</a>、EDRを無効化する攻撃者の戦術は <a href="/learn/security/mitre-attack">MITRE ATT&amp;CK 入門</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
