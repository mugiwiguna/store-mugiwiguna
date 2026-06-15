import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-lg">
          <h1 className="text-2xl font-semibold tracking-tight leading-tight mb-4">
            Quality Products,<br />
            Great Prices
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Discover our curated collection of premium products with fast shipping across Indonesia.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold text-white bg-[var(--text-primary)] hover:bg-[var(--text-primary)]/85 transition-opacity"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-secondary)] mb-4">Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All Products" ? "/products" : `/products?category=${encodeURIComponent(cat)}`}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] border border-[var(--border)] whitespace-nowrap hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-secondary)]">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-[var(--text-primary)] hover:underline underline-offset-2 transition-all">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
