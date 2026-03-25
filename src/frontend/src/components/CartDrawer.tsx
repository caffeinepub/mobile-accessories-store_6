import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { useCart, useRemoveFromCart } from "../hooks/useQueries";
import { formatPrice, getProductImage } from "../utils/productHelpers";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { data: cart, isLoading } = useCart();
  const removeFromCart = useRemoveFromCart();

  const handleRemove = async (productId: bigint, name: string) => {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success(`${name} removed from cart`);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const total =
    cart?.reduce(
      (sum, [product, qty]) => sum + Number(product.price) * Number(qty),
      0,
    ) ?? 0;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-sm p-0 flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-heading font-black uppercase tracking-widest text-base">
            YOUR CART {cart && cart.length > 0 && `(${cart.length})`}
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div
            className="flex-1 flex items-center justify-center"
            data-ocid="cart.loading_state"
          >
            <span className="text-muted-foreground text-sm font-body">
              Loading cart…
            </span>
          </div>
        ) : !cart || cart.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-3"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag
              size={36}
              strokeWidth={1}
              className="text-muted-foreground"
            />
            <p className="text-muted-foreground text-sm font-body">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.map(([product, qty], i) => (
                <div
                  key={String(product.id)}
                  className="flex gap-3 items-start"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-section-gray overflow-hidden">
                    <img
                      src={getProductImage(product.category)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wide truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      Qty: {Number(qty)}
                    </p>
                    <p className="font-heading font-black text-sm mt-1">
                      {formatPrice(product.price * qty)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id, product.name)}
                    disabled={removeFromCart.isPending}
                    data-ocid={`cart.delete_button.${i + 1}`}
                    className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex-shrink-0"
                    aria-label={`Remove ${product.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-border space-y-3">
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">
                  Total
                </span>
                <span className="font-heading font-black text-lg">
                  ${(total / 100).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                data-ocid="cart.checkout.primary_button"
                className="w-full bg-foreground text-primary-foreground font-heading font-bold text-xs tracking-widest uppercase py-4 hover:bg-foreground/80 transition-colors"
              >
                CHECKOUT
              </button>
              <button
                type="button"
                onClick={onClose}
                data-ocid="cart.close.button"
                className="w-full border border-foreground text-foreground font-heading font-bold text-xs tracking-widest uppercase py-3.5 hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
