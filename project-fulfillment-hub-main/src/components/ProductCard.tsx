import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-lg transition-shadow group">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-md mb-3">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <Link to={`/product/${product.id}`}>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-1">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.floor(product.rating)
                ? "fill-warning text-warning"
                : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          ({product.reviewCount.toLocaleString()})
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-lg font-bold text-foreground">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
            <span className="text-xs font-medium text-success">
              {discount}% off
            </span>
          </>
        )}
      </div>

      <Button
        onClick={() => addToCart(product)}
        className="w-full"
        size="sm"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
