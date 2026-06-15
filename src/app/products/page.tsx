"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
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

  const clearFilters = () => {
    setSelectedCategory("All Products");
    setSearchQuery("");
    setPriceMin("");
    setPriceMax("");
  };

  const hasFilters =
    selectedCategory !== "All Products" || searchQuery || priceMin || priceMax;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-20 space-y-3">
            {/* Search */}
            <div className="bg-white border border-notion-border rounded-lg p-4">
              <h3 className="text-xs font-semibold text-notion-black mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-notion-gray pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/60 focus:outline-none focus:border-notion-black transition-colors"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border border-notion-border rounded-lg p-4">
              <h3 className="text-xs font-semibold text-notion-black mb-3">Categories</h3>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                      selectedCategory === cat
                        ? "bg-selected font-medium text-notion-black"
                        : "text-notion-gray hover:text-notion-black hover:bg-hover"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white border border-notion-border rounded-lg p-4">
              <h3 className="text-xs font-semibold text-notion-black mb-3">Price</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full h-8 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/60 focus:outline-none focus:border-notion-black"
                />
                <span className="text-notion-gray/60 text-xs">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full h-8 px-3 bg-surface border border-notion-border rounded text-sm placeholder:text-notion-gray/60 focus:outline-none focus:border-notion-black"
                />
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full text-xs text-accent hover:text-accent-hover transition-colors text-left"
              >
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-notion-border rounded-full text-notion-gray hover:text-notion-black hover:bg-hover transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </button>
              <p className="text-sm text-notion-gray">
                {filteredProducts.length} products
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 px-3 pr-8 bg-white border border-notion-border rounded text-sm text-notion-black focus:outline-none focus:border-notion-black appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23787774' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden mb-5 p-4 bg-white border border-notion-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-notion-gray">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? "bg-notion-black text-white"
                        : "bg-surface text-notion-gray border border-notion-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active filter tags */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory !== "All Products" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-selected text-xs rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Products")} className="text-notion-gray hover:text-notion-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-selected text-xs rounded-full">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="text-notion-gray hover:text-notion-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm font-medium text-notion-black mb-1">No products found</p>
              <p className="text-xs text-notion-gray mb-4">Try adjusting your filters.</p>
              <button
                onClick={clearFilters}
                className="h-8 px-4 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}