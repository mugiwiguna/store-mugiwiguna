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
        <div className="bg-white border border-notion-border rounded p-6">
          <div className="max-w-md">
            <h1 className="text-xl font-medium text-notion-black leading-tight mb-2">
              Quality Products,{" "}
              <span className="text-accent">Great Prices</span>
            </h1>
            <p className="text-sm text-notion-gray leading-relaxed mb-4">
              Discover our curated collection of premium products with fast shipping across Indonesia.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 h-8 px-4 text-sm font-medium text-white bg-notion-black hover:bg-notion-black/85 rounded transition-colors"
            >
              Browse Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-6 pb-6">
        <h2 className="text-sm font-medium text-notion-black mb-2.5">Categories</h2>
        <div className="flex gap-1.5 overflow-x-auto pb-1.5">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All Products" ? "/products" : `/products?category=${encodeURIComponent(cat)}`}
              className="px-3 py-1.5 text-[13px] text-notion-gray bg-white border border-notion-border rounded-full whitespace-nowrap hover:border-notion-gray hover:text-notion-black transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-medium text-notion-black">Featured Products</h2>
          <Link href="/products" className="text-[13px] text-accent hover:text-accent-hover transition-colors">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
