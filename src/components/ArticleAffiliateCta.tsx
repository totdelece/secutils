/**
 * 解説記事の本文中に差し込む、PR表記付きのCTAブロック。
 *
 * PR記事（src/components/pr-review）のような記事全体のLP化ではなく、
 * 通常の解説記事の該当セクション直後に1つだけ置く用途を想定している。
 * 記事本体の情報価値を保ったまま、文脈の合う場所でだけ紹介するための部品。
 *
 * - ステマ規制対応として「PR」バッジと免責文を必ず表示する
 * - リンクは rel="nofollow sponsored"（サイト全体の表記に統一）
 * - note は「無料相談あり」等、実在が確認できる訴求のみを渡すこと
 */
export function ArticleAffiliateCta({
  title,
  description,
  bullets,
  ctaLabel,
  href,
  note,
  target,
}: {
  /** 何のサービスかが一目で分かる見出し */
  title: string;
  /** 誰向け・何ができるかの説明（1〜2文） */
  description: string;
  /** 具体的な特徴。3件程度まで */
  bullets?: string[];
  /** ボタン文言。「〜を見る」「無料相談を申し込む」など動作が分かる日本語で */
  ctaLabel: string;
  /** A8のリンクURL。未取得の間は "#" を入れておく */
  href: string;
  /** ボタン下の補足（例: 登録・相談は無料） */
  note?: string;
  /** 「こんな人向け」の一行。記事の文脈と読者を結びつける */
  target?: string;
}) {
  return (
    <aside className="my-8 rounded-2xl border border-border-subtle bg-bg-elevated p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-border-strong px-2 py-0.5 text-[11px] font-bold tracking-wide text-fg-muted">
          PR
        </span>
        {target && (
          <span className="text-[13px] font-semibold text-fg-muted">{target}</span>
        )}
      </div>

      <p className="mt-3 text-[17px] font-bold text-fg-primary">{title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-secondary">
        {description}
      </p>

      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-[14px] leading-relaxed text-fg-secondary"
            >
              <span aria-hidden className="text-accent">
                ・
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-bold text-white transition-opacity hover:opacity-90"
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </a>

      {note && (
        <p className="mt-2 text-center text-[13px] font-semibold text-accent-strong">
          {note}
        </p>
      )}
      <p className="mt-3 text-center text-[11px] text-fg-subtle">
        ※ 当サイトはアフィリエイト広告を利用しています。リンク経由の申込みにより
        当サイトが報酬を受け取る場合がありますが、記載内容は編集方針に基づき独自に作成しています。
      </p>
    </aside>
  );
}
