import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-night px-4 py-16 text-center text-white">
      <div>
        <p className="eyebrow justify-center text-brand-ice">Error 404</p>
        <h1 className="mt-4 font-display text-6xl font-semibold">Page Not Found</h1>
        <p className="mt-4 text-lg text-slate-300">The page you requested could not be found.</p>
        <Link href="/" className="btn-primary mt-8">Return Home</Link>
      </div>
    </section>
  );
}
