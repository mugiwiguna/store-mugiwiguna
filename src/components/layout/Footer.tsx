import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-32">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[var(--text-secondary)]">
            &copy; 2026 store.mugiwiguna.dev
          </p>
          <div className="flex items-center gap-6">
            <Link href="/products" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Products
            </Link>
            <Link href="https://mugiwiguna.dev" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              mugiwiguna.dev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
