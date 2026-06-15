import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white border border-notion-border rounded-lg p-8">
          <div className="max-w-lg">
            <h1 className="text-2xl font-semibold text-notion-black leading-tight mb-3">
              Quality Products,{" "}
              <span className="text-accent">Great Prices</span>
            </h1>
            <p className="text-sm text-notion-gray leading-relaxed mb-5">
              Discover our curated collection of premium products with fast shipping across Indonesia.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-9 px-5 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <h2 className="text-sm font-semibold text-notion-black mb-3">Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All Products" ? "/products" : `/products?category=${encodeURIComponent(cat)}`}
              className="px-3 py-1.5 text-xs font-medium text-notion-gray bg-white border border-notion-border rounded-full whitespace-nowrap hover:border-notion-border-hover hover:text-notion-black transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-notion-black">Featured Products</h2>
          <Link href="/products" className="text-xs text-accent hover:text-accent-hover transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
