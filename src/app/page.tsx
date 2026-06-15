import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const saleProducts = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
              Free shipping over Rp 500.000
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Quality Products,{" "}
              <span className="text-blue-600">Great Prices</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Discover our curated collection of premium products with fast shipping across Indonesia.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?category=Electronics"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.filter(c => c !== "All Products").map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="flex-shrink-0 px-5 py-2.5 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-xl transition-all whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Hand-picked just for you</p>
          </div>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 mb-2">
                  🔥 Hot Deals
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
                <p className="text-gray-500 mt-1">Limited time discounts</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to find your next favorite product?</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">Browse our full catalog with hundreds of products at unbeatable prices.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md">
          Explore All Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
