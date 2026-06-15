"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "All Products") result = result.filter((p) => p.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (priceMin) result = result.filter((p) => p.price >= parseInt(priceMin));
    if (priceMax) result = result.filter((p) => p.price <= parseInt(priceMax));
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, searchQuery, sortBy, priceMin, priceMax]);

  const hasFilters = selectedCategory !== "All Products" || searchQuery || priceMin || priceMax;
  const clearFilters = () => { setSelectedCategory("All Products"); setSearchQuery(""); setPriceMin(""); setPriceMax(""); };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button onClick={() => setShowMobileFilter(true)} className="lg:hidden p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === cat ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <span className="text-gray-300">—</span>
                <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>

            {/* Sort */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Sort By</h3>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="w-full py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilter(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                      }`}>{cat}</button>
                  ))}
                </div>
              </div>
              <button onClick={clearFilters} className="w-full py-3 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50">Clear filters</button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== "All Products" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Products")} className="hover:text-blue-900"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="hover:text-blue-900"><X className="w-3.5 h-3.5" /></button>
                </span>
              )}
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-1">No products found</p>
              <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
