"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Language = "latin" | "japanese";

const LATIN_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi",
  "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci", "numquam",
  "eius", "modi", "incidunt", "magnam", "quaerat", "minima",
];

const LOREM_OPENING = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
];

const JAPANESE_FRAGMENTS = [
  "あらゆる現実をすべて自分のほうへねじ曲げたのだ", "一例をあげると", "そういう生活を続けることに何の意味があるのか",
  "彼は人生で最も大切なものを見失っていた", "夜の闇は静かに街を包んでいた", "風の音が遠くから聞こえてくる",
  "新しい技術が世界を変えようとしている", "選択肢は無限にあるように思えた", "古い建物の壁には歴史が刻まれている",
  "彼女は窓の外を眺めながらお茶を飲んだ", "プロジェクトの締め切りが近づいていた", "言葉では言い表せない感情が胸の中に渦巻く",
  "雨が降り始める前に家に帰らなければならない", "図書館の本棚には数えきれないほどの物語が並ぶ", "コーヒーの香りが朝の眠気を吹き飛ばした",
  "山頂から見下ろす景色は息を呑むほど美しかった", "電車の窓から流れる景色は時間の流れを感じさせる", "都市の喧騒の中で一人静かに考えごとをする",
  "計画通りに進まないことのほうがむしろ普通だ", "失敗から学ぶことのほうが成功から学ぶことより多い", "新しい一日が始まる予感がする",
  "古い友人との再会は時を超えた喜びをもたらす", "雲の隙間から差し込む光が地面を照らした", "誰かのために何かを成し遂げたいと思った",
  "本を読むことは知識への小さな旅である", "情報の海の中で本当に必要なものを見極める", "毎日の積み重ねが大きな変化を生み出す",
  "完璧を目指すよりまず終わらせることが大切だ", "シンプルな問いほど答えるのが難しい", "経験は最高の教師であるという言葉がある",
  "今この瞬間にしかできないことがある",
];

function pickRandom<T>(arr: T[]): T {
  const bytes = new Uint8Array(1);
  crypto.getRandomValues(bytes);
  return arr[bytes[0] % arr.length];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateLatinSentence(minWords: number, maxWords: number): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(pickRandom(LATIN_WORDS));
  }
  return capitalize(words.join(" ")) + ".";
}

function generateLatinParagraph(
  wordCount: number,
  startWithLorem: boolean,
): string {
  const sentences: string[] = [];
  let usedWords = 0;
  let first = true;
  while (usedWords < wordCount) {
    let sentence: string;
    if (first && startWithLorem) {
      const opening = LOREM_OPENING.join(" ");
      const extraCount = 6 + Math.floor(Math.random() * 8);
      const extras: string[] = [];
      for (let i = 0; i < extraCount; i++) extras.push(pickRandom(LATIN_WORDS));
      sentence = capitalize(opening) + ", " + extras.join(" ") + ".";
      usedWords += LOREM_OPENING.length + extraCount;
    } else {
      const remaining = wordCount - usedWords;
      const min = Math.min(6, remaining);
      const max = Math.min(14, remaining);
      sentence = generateLatinSentence(min, max);
      usedWords += sentence.split(" ").length;
    }
    sentences.push(sentence);
    first = false;
  }
  return sentences.join(" ");
}

function generateJapaneseParagraph(approxChars: number): string {
  const parts: string[] = [];
  let total = 0;
  while (total < approxChars) {
    const fragment = pickRandom(JAPANESE_FRAGMENTS);
    parts.push(fragment);
    total += fragment.length + 1;
  }
  return parts.join("。") + "。";
}

export default function LoremIpsumPage() {
  const [language, setLanguage] = useState<Language>("latin");
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const safeParagraphs = Math.max(1, Math.min(50, Math.floor(paragraphs) || 1));
    const safeWords = Math.max(5, Math.min(500, Math.floor(wordsPerParagraph) || 5));
    const result: string[] = [];
    for (let i = 0; i < safeParagraphs; i++) {
      if (language === "latin") {
        result.push(generateLatinParagraph(safeWords, startWithLorem && i === 0));
      } else {
        result.push(generateJapaneseParagraph(safeWords * 2));
      }
    }
    setOutput(result.join("\n\n"));
  }, [language, paragraphs, wordsPerParagraph, startWithLorem]);

  useEffect(() => {
    generate();
  }, [generate]);

  const stats = useMemo(() => {
    const text = output;
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const para = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
    return { chars, words, para };
  }, [output]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        📝 Lorem Ipsum Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        デザイン検証用のダミーテキストを生成します。Lorem ipsum（ラテン語風）と日本語ダミー文章に対応。
        生成処理はブラウザ内で完結し、サーバーには送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-5 inline-flex bg-black/5 dark:bg-white/5">
        {(["latin", "japanese"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLanguage(l)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              language === l
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {l === "latin" ? "Lorem Ipsum" : "日本語ダミー"}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="li-paragraphs"
            className="text-sm font-medium block mb-2"
          >
            段落数
          </label>
          <input
            id="li-paragraphs"
            type="number"
            min={1}
            max={50}
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value, 10) || 1)}
            className="w-32 bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="li-words"
            className="text-sm font-medium block mb-2"
          >
            {language === "latin" ? "1段落あたりの単語数（目安）" : "1段落あたりの文字数（目安/2）"}
          </label>
          <input
            id="li-words"
            type="number"
            min={5}
            max={500}
            value={wordsPerParagraph}
            onChange={(e) =>
              setWordsPerParagraph(parseInt(e.target.value, 10) || 5)
            }
            className="w-32 bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
          />
        </div>
      </div>

      {language === "latin" && (
        <label className="flex items-center gap-2 mb-5 text-sm">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="accent-emerald-600"
          />
          <span>1段落目を「Lorem ipsum dolor sit amet...」で始める</span>
        </label>
      )}

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={generate}
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition"
        >
          ↻ 再生成
        </button>
        <button
          onClick={copy}
          disabled={!output}
          className="px-4 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition disabled:opacity-50"
        >
          {copied ? "Copied!" : "コピー"}
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden mb-3">
        <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
          <span>結果</span>
          <span className="font-mono text-black/40 dark:text-white/40">
            {stats.para}段 / {stats.words}語 / {stats.chars}文字
          </span>
        </div>
        <textarea
          value={output}
          readOnly
          rows={14}
          className="w-full bg-transparent px-4 py-3 outline-none text-sm leading-relaxed resize-y"
          spellCheck={false}
        />
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 Lorem Ipsum について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Lorem ipsum</strong> は 16世紀から印刷業界で使われるラテン語風の標準ダミーテキストです。実在の単語のように見えるため、意味のあるコピーに視線を奪われずレイアウトを評価できます。
          </li>
          <li>
            日本語ダミーは、句読点と漢字仮名交じりの密度を再現するため、英文Lorem Ipsumとは異なる視覚的な印象になります。日本語サイトのデザイン検証では日本語ダミーの方が実際の見た目に近づけられます。
          </li>
          <li>
            生成はブラウザ内で完結し、暗号学的乱数（<code className="font-mono">crypto.getRandomValues</code>）で単語を選びます。サーバーには何も送信しません。
          </li>
        </ul>
      </div>
    </div>
  );
}
