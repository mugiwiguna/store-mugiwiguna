import Link from "next/link";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const newProducts = products.filter((p) => p.badge === "new").slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border border-[var(--border-default)] rounded-xl mx-4 my-6 md:mx-0 md:my-8 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-subtle)] text-[var(--accent-primary)] text-xs font-semibold rounded mb-4">
            <Sparkles className="w-3 h-3" />
            New Arrivals
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Discover Quality Products for Your{" "}
            <span className="text-[var(--accent-primary)]">Lifestyle</span>
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            Shop the latest collection with premium quality, competitive prices,
            and fast shipping across Indonesia.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn btn--primary btn--lg">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products?badge=new" className="btn btn--secondary btn--lg">
              View Categories
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-hover)] rounded-xl flex items-center justify-center text-[var(--text-placeholder)]">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All Products" ? "/products" : `/products?category=${encodeURIComponent(cat)}`}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-white border border-[var(--border-default)] rounded-full whitespace-nowrap hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Popular Products</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--warning)] fill-current" />
              New Arrivals
            </h2>
            <Link
              href="/products?badge=new"
              className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Features Banner */}
      <section className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Free Shipping", desc: "On orders over Rp 500.000" },
            { title: "Secure Payment", desc: "100% secure transactions" },
            { title: "Easy Returns", desc: "30-day return policy" },
            { title: "24/7 Support", desc: "Always here to help" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-[var(--border-default)] rounded-lg p-4 text-center"
            >
              <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
