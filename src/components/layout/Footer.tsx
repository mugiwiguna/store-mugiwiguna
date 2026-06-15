import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-notion-border mt-16">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-notion-gray">
            © 2026 store.mugiwiguna.dev
          </p>
        </div>
      </div>
    </footer>
  );
}