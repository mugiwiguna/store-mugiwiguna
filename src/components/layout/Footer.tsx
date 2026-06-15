import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-notion-border mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-notion-gray">
            © 2026 store.mugiwiguna.dev
          </p>
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-[13px] text-notion-gray hover:text-notion-black transition-colors">
              Products
            </Link>
            <span className="text-notion-border">·</span>
            <Link href="https://mugiwiguna.dev" className="text-[13px] text-notion-gray hover:text-notion-black transition-colors">
              mugiwiguna.dev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
