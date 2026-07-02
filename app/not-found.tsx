import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-brand-pale px-4 py-16 text-center">
      <div>
        <h1 className="text-5xl font-black">404</h1>
        <p className="mt-4 text-lg text-slate-600">The page you requested could not be found.</p>
        <Link href="/" className="btn-secondary mt-6">Return Home</Link>
      </div>
    </section>
  );
}
