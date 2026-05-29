import { articles } from "@/lib/articles";
import { tools } from "@/lib/tools";
import { HomeHero } from "./_components/HomeHero";
import { ToolIndex } from "./_components/ToolIndex";
import { HomeLearn } from "./_components/HomeLearn";

export default function Home() {
  return (
    <>
      <HomeHero toolCount={tools.length} articleCount={articles.length} />
      <ToolIndex />
      <HomeLearn />
    </>
  );
}
