"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(".article-prose");
    if (!root) return;
    const nodes = Array.from(
      root.querySelectorAll("h2, h3"),
    ) as HTMLElement[];
    if (nodes.length === 0) return;

    const collected: Heading[] = nodes.map((node, i) => {
      if (!node.id) node.id = `section-${i}`;
      node.style.scrollMarginTop = "96px";
      return {
        id: node.id,
        text: node.textContent ?? "",
        level: node.tagName === "H3" ? 3 : 2,
      };
    });
    setHeadings(collected);
    setActiveId(collected[0]?.id ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return { headings, activeId };
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function TocList({
  headings,
  activeId,
  onSelect,
}: {
  headings: Heading[];
  activeId: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <ul className="space-y-0.5 text-[13px]">
      {headings.map((h) => {
        const active = h.id === activeId;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(h.id);
                onSelect?.(h.id);
              }}
              className={[
                "block rounded-lg py-1.5 leading-snug transition",
                h.level === 3 ? "pl-6 pr-2.5" : "px-2.5",
                active
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-fg-muted hover:bg-bg-sunken/50 hover:text-fg-primary",
              ].join(" ")}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ArticleTocDesktop() {
  const { headings, activeId } = useHeadings();
  if (headings.length === 0) return null;
  return (
    <div className="article-side-panel rounded-xl p-5">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">
        On this page
      </div>
      <nav aria-label="目次">
        <TocList headings={headings} activeId={activeId} />
      </nav>
    </div>
  );
}

export function ArticleTocMobile() {
  const { headings, activeId } = useHeadings();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-5 text-sm font-semibold text-fg-primary shadow-lg backdrop-blur"
      >
        <ListIcon />
        目次
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <button
            type="button"
            aria-label="目次を閉じる"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border-strong bg-bg-elevated p-5 pb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                目次
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-fg-muted hover:bg-bg-sunken hover:text-fg-primary"
                aria-label="閉じる"
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="目次">
              <TocList
                headings={headings}
                activeId={activeId}
                onSelect={() => setOpen(false)}
              />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
