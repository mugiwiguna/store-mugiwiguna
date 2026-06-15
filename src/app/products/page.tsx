"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories, Product } from "@/data/products";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
  { value: "bestseller", label: "Best Selling" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Price filter
    if (priceMin) {
      result = result.filter((p) => p.price >= parseInt(priceMin));
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= parseInt(priceMax));
    }

    // Badge filter
    if (selectedBadges.length > 0) {
      result = result.filter((p) => p.badge && selectedBadges.includes(p.badge));
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // newest - keep original order (assuming it's already newest first)
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceMin, priceMax, selectedBadges, minRating]);

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge)
        ? prev.filter((b) => b !== badge)
        : [...prev, badge]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All Products");
    setSearchQuery("");
    setPriceMin("");
    setPriceMax("");
    setSelectedBadges([]);
    setMinRating(0);
  };

  const hasActiveFilters =
    selectedCategory !== "All Products" ||
    searchQuery ||
    priceMin ||
    priceMax ||
    selectedBadges.length > 0 ||
    minRating > 0;

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-20 space-y-4">
            {/* Search */}
            <div className="bg-white border border-[var(--border-default)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-placeholder)]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border border-[var(--border-default)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedCategory === cat
                        ? "bg-[var(--bg-selected)] font-medium"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white border border-[var(--border-default)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full h-9 px-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                />
                <span className="text-[var(--text-placeholder)]">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full h-9 px-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)]"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white border border-[var(--border-default)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Special Offers</h3>
              <div className="space-y-2">
                {["new", "sale", "hot"].map((badge) => (
                  <label key={badge} className="flex items-center gap-2 cursor-pointer">
                    <button
                      onClick={() => toggleBadge(badge)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selectedBadges.includes(badge)
                          ? "bg-[var(--accent-primary)] border-[var(--accent-primary)]"
                          : "border-[var(--border-default)]"
                      }`}
                    >
                      {selectedBadges.includes(badge) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                    <span className="text-sm text-[var(--text-secondary)] capitalize">
                      {badge === "sale" ? "On Sale" : badge === "hot" ? "Hot Items" : "New Arrivals"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white border border-[var(--border-default)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      minRating === rating
                        ? "bg-[var(--bg-selected)] font-medium"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                    }`}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < rating ? "text-[var(--warning)]" : "text-[var(--border-default)]"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full text-sm text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn btn--secondary btn--sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <p className="text-sm text-[var(--text-secondary)]">
                {filteredProducts.length} products
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--text-secondary)]">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 pr-8 bg-white border border-[var(--border-default)] rounded-md text-sm focus:outline-none focus:border-[var(--border-focus)] appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23787774' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 bg-white border border-[var(--border-default)] rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Simplified mobile filters */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-[var(--text-primary)] text-white"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--accent-primary)]"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== "All Products" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-selected)] text-sm rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Products")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-selected)] text-sm rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-selected)] text-sm rounded-full capitalize">
                  {badge}
                  <button onClick={() => toggleBadge(badge)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Try adjusting your filters or search query
              </p>
              <button onClick={clearFilters} className="btn btn--primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}