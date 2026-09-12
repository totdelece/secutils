import Link from "next/link";
import { aiUsageText, author, editorialPolicy } from "@/lib/author";

/* トップページで「誰が・どう作っているサイトか」を示す（E-E-A-T の Who / How）。
 * 文言は author.ts を単一の真実源として参照し、About と食い違わないようにする。 */
export function HomeAbout() {
  const items = [
    {
      title: "運営者",
      body: `${author.handle}（${author.role}）。${author.bio}`,
    },
    {
      title: "出典と検証",
      body: `${editorialPolicy.summary}${editorialPolicy.points[3]}`,
    },
    {
      title: "生成AIの利用",
      body: aiUsageText,
    },
  ];

  return (
    <section className="border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-fg-primary sm:text-3xl">
          運営者と編集方針
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-fg-muted">
          このサイトを誰がどのように作っているかをまとめています。
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border-subtle bg-bg-elevated p-5"
            >
              <h3 className="text-sm font-semibold text-fg-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-fg-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href="/about" className="text-accent-strong hover:underline">
            運営者・編集方針の詳細
          </Link>
          <Link href={author.profilePath} className="text-accent-strong hover:underline">
            著者プロフィールと執筆記事
          </Link>
          <Link href={author.contactPath} className="text-accent-strong hover:underline">
            お問い合わせ・誤りのご指摘
          </Link>
        </div>
      </div>
    </section>
  );
}
