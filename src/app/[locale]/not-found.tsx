import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-navy">404</h1>
      <p className="mt-3 text-ink/70">This page could not be found.</p>
      <Link href="/" className="btn-yellow mt-8 inline-flex">
        Back to homepage
      </Link>
    </div>
  );
}
