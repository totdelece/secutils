export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tools-stage relative isolate overflow-hidden">
      <div className="tools-mesh" aria-hidden="true" />
      <div className="tools-routing" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
