import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border-default)] mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-xl font-semibold mb-3">
              store<span className="font-normal text-[var(--text-secondary)]">.mugiwiguna.dev</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Your trusted online store for quality products. Fast shipping, secure payment, and excellent customer service.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link href="/products" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                All Products
              </Link>
              <Link href="/products?badge=new" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                New Arrivals
              </Link>
              <Link href="/products?sort=bestseller" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Best Sellers
              </Link>
              <Link href="/products?badge=sale" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Sale
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Help</h4>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Contact Us
              </Link>
              <Link href="/shipping" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Returns
              </Link>
              <Link href="/faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                About Us
              </Link>
              <Link href="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Terms of Service
              </Link>
              <Link href="/careers" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[var(--border-default)] gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2026 store.mugiwiguna.dev. All rights reserved.
          </p>
          <div className="flex gap-3">
            {/* Instagram */}
            <a href="#" className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-all" aria-label="Instagram">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-all" aria-label="Twitter">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.2 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-all" aria-label="Facebook">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
