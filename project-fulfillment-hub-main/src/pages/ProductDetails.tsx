import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        {" > "}
        <Link to={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
          {product.category}
        </Link>
        {" > "}
        <span className="text-foreground">{product.brand}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-card rounded-lg border border-border p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-primary mb-1">{product.brand}</p>
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-warning text-warning"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-info">{product.reviewCount.toLocaleString()} ratings</span>
          </div>

          <hr className="my-3 border-border" />

          <div className="flex items-baseline gap-3 mb-1">
            {discount > 0 && (
              <span className="text-sm font-medium text-destructive">-{discount}%</span>
            )}
            <span className="text-3xl font-bold text-foreground">${product.price}</span>
          </div>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground mb-4">
              M.R.P.: <span className="line-through">${product.originalPrice}</span>
            </p>
          )}

          {product.inStock ? (
            <p className="text-success font-medium mb-4">In Stock</p>
          ) : (
            <p className="text-destructive font-medium mb-4">Out of Stock</p>
          )}

          <p className="text-sm text-foreground leading-relaxed mb-4">{product.description}</p>

          {product.features && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-muted"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-muted"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => addToCart(product, quantity)}
              className="flex-1"
              size="lg"
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <Link to="/cart">Buy Now</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { icon: Truck, label: "Free Delivery" },
              { icon: RotateCcw, label: "Easy Returns" },
              { icon: ShieldCheck, label: "Secure Payment" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 bg-muted rounded-md">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
