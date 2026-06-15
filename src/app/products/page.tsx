"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
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
    if (selectedCategory !== "All Products") result = result.filter((p) => p.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (priceMin) result = result.filter((p) => p.price >= parseInt(priceMin));
    if (priceMax) result = result.filter((p) => p.price <= parseInt(priceMax));
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
    }
    return result;
  }, [selectedCategory, searchQuery, sortBy, priceMin, priceMax]);

  const hasFilters = selectedCategory !== "All Products" || searchQuery || priceMin || priceMax;
  const clearFilters = () => { setSelectedCategory("All Products"); setSearchQuery(""); setPriceMin(""); setPriceMax(""); };

  return (
    <div className="container pt-10 pb-24">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-20 space-y-0.5">
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--text-secondary)] mb-3">Categories</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedCategory === cat ? "bg-[var(--bg-hover)] font-semibold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"}`}
              >
                {cat}
              </button>
            ))}

            <hr className="border-[var(--border)] my-4" />

            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[var(--text-secondary)] mb-3">Price</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                className="w-full h-9 px-3 border border-[var(--border)] text-sm placeholder:text-[var(--text-secondary)]/60" />
              <span className="text-[var(--text-secondary)]/60">&mdash;</span>
              <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                className="w-full h-9 px-3 border border-[var(--border)] text-sm placeholder:text-[var(--text-secondary)]/60" />
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="mt-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <p className="text-sm text-[var(--text-secondary)]">{filteredProducts.length} products</p>
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 bg-[var(--bg-surface)] border border-[var(--border)] text-sm appearance-none cursor-pointer">
              {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-[var(--text-secondary)]"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                    className={`px-3 py-2 text-sm font-medium border whitespace-nowrap transition-colors ${selectedCategory === cat ? "bg-[var(--text-primary)] text-white border-[var(--text-primary)]" : "text-[var(--text-secondary)] border-[var(--border)]"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory !== "All Products" && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--bg-hover)] text-sm">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Products")} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--bg-hover)] text-sm">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sm font-medium mb-1">No products found</p>
              <p className="text-[13px] text-[var(--text-secondary)] mb-5">Try adjusting your filters.</p>
              <button onClick={clearFilters} className="h-9 px-5 text-sm font-semibold text-white bg-[var(--text-primary)] hover:opacity-85 transition-opacity">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
