import Link from "next/link";

export function Breadcrumbs({
  items,
  dark = false
}: {
  items: { href?: string; label: string }[];
  dark?: boolean;
}) {
  const linkClass = dark ? "text-brand-ice hover:underline" : "text-brand-blue hover:underline";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm font-bold ${dark ? "text-slate-300" : "text-slate-600"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className={linkClass}>Home</Link></li>
        {items.map((item, index) => (
          <li key={`${item.href ?? "current"}-${item.label}-${index}`} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className={linkClass}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
