export type ToolCategory = "security" | "encoding" | "network" | "misc";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;
};

export const categoryLabels: Record<ToolCategory, string> = {
  security: "Security",
  encoding: "Encoding",
  network: "Network",
  misc: "Misc",
};

export const tools: Tool[] = [
  {
    slug: "password-generator",
    title: "Password Generator",
    description:
      "暗号学的に安全なパスワードを生成。長さ・文字種・記号有無を細かく指定できます。",
    category: "security",
    icon: "🔐",
  },
];
