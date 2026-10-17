import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground">
      {/* Top bar */}
      <div className="container mx-auto flex items-center gap-4 h-14 px-4">
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
          Easy Buy
        </Link>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search products, brands and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-10 px-4 rounded-l-md text-foreground text-sm bg-card border-0 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Link
            to={search ? `/?search=${encodeURIComponent(search)}` : "/"}
            className="h-10 w-12 flex items-center justify-center rounded-r-md bg-header-search hover:opacity-90 transition-opacity"
          >
            <Search className="w-5 h-5 text-primary-foreground" />
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm">Hello, {user?.name}</span>
              <button onClick={logout} className="text-xs underline opacity-80 hover:opacity-100">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-1 text-sm hover:underline">
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          <Link to="/cart" className="relative flex items-center gap-1 text-sm hover:underline">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="sm:hidden px-4 pb-2">
        <div className="flex">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-9 px-3 rounded-l-md text-foreground text-sm bg-card border-0 focus:outline-none"
          />
          <Link
            to={search ? `/?search=${encodeURIComponent(search)}` : "/"}
            className="h-9 w-10 flex items-center justify-center rounded-r-md bg-header-search"
          >
            <Search className="w-4 h-4 text-primary-foreground" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-header border-t border-muted/20 px-4 py-4 space-y-3">
          {isAuthenticated ? (
            <>
              <p className="text-sm">Hello, {user?.name}</p>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm underline">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm hover:underline" onClick={() => setMobileOpen(false)}>Sign In</Link>
          )}
          <Link to="/cart" className="block text-sm hover:underline" onClick={() => setMobileOpen(false)}>Cart ({totalItems})</Link>
        </div>
      )}

      {/* Category nav removed */}
    </header>
  );
};

export default Header;
