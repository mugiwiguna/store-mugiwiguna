import Link from "next/link";

const footerLinks = {
  Shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=Electronics", label: "Electronics" },
    { href: "/products?category=Fashion", label: "Fashion" },
    { href: "/products?category=Home+%26+Living", label: "Home & Living" },
  ],
  Support: [
    { href: "#", label: "Shipping Info" },
    { href: "#", label: "Returns" },
    { href: "#", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">store.mugiwiguna.dev</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Quality products with great prices and fast shipping across Indonesia.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">&copy; 2026 store.mugiwiguna.dev. All rights reserved.</p>
          <Link href="https://mugiwiguna.dev" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">mugiwiguna.dev</Link>
        </div>
      </div>
    </footer>
  );
}
