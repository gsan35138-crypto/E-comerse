import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const searchParam = searchParams.get("search") || "";

  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (categoryParam !== "All") {
      result = result.filter((p) => p.category === categoryParam);
    }

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [categoryParam, searchParam, sortBy, priceRange]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb & Results */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {searchParam
              ? `Results for "${searchParam}"`
              : categoryParam !== "All"
              ? categoryParam
              : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} results
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-1 text-sm border border-border rounded-md px-3 py-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Avg. Rating</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? "block" : "hidden"} sm:block w-full sm:w-56 shrink-0`}>
          <div className="bg-card rounded-lg border border-border p-4 space-y-5 sticky top-32">
            <div>
              <h3 className="font-semibold text-sm mb-2">Category</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={categoryParam === cat}
                      onChange={() => {
                        const url = cat === "All" ? "/" : `/?category=${encodeURIComponent(cat)}`;
                        window.history.pushState({}, "", url);
                        window.dispatchEvent(new PopStateEvent("popstate"));
                      }}
                      className="accent-primary"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-20 text-sm border border-border rounded px-2 py-1 bg-card"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">–</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-20 text-sm border border-border rounded px-2 py-1 bg-card"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found.</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
