import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="text-brand-blue hover:underline">Home</Link></li>
        {items.map((item, index) => (
          <li key={`${item.href ?? "current"}-${item.label}-${index}`} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="text-brand-blue hover:underline">{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
