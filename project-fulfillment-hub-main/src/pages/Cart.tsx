import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-card rounded-lg border border-border p-4 flex gap-4">
              <Link to={`/product/${product.id}`} className="shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>

                {product.inStock ? (
                  <p className="text-xs text-success mt-1">In Stock</p>
                ) : (
                  <p className="text-xs text-destructive mt-1">Out of Stock</p>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:bg-muted"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 hover:bg-muted"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">${(product.price * quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-destructive hover:text-destructive/80 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-lg border border-border p-5 h-fit sticky top-20">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <hr className="my-3 border-border" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button asChild className="w-full mt-5" size="lg">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button variant="outline" asChild className="w-full mt-2" size="sm">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
