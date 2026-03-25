import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useAddToCart,
  useAddToWishlist,
  useAllProducts,
} from "../hooks/useQueries";
import {
  formatPrice,
  getProductImage,
  renderStars,
} from "../utils/productHelpers";

const FALLBACK_PRODUCTS = [
  {
    id: 1n,
    name: "Crystal Clear Case",
    description: "Ultra-thin transparent protection",
    category: "cases" as any,
    rating: 5n,
    price: 1999n,
  },
  {
    id: 2n,
    name: "SlimCharge 10K",
    description: "10,000 mAh slim power bank",
    category: "power" as any,
    rating: 4n,
    price: 4999n,
  },
  {
    id: 3n,
    name: "AirBuds Pro X",
    description: "Active noise cancellation earbuds",
    category: "audio" as any,
    rating: 5n,
    price: 7999n,
  },
  {
    id: 4n,
    name: "Nano Shield Glass",
    description: "Military-grade screen protection",
    category: "protection" as any,
    rating: 4n,
    price: 1499n,
  },
];

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const stars = renderStars(product.rating);

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync(product.id);
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    try {
      await addToWishlist.mutateAsync(product.id);
      toast.success(`${product.name} added to wishlist!`);
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-ocid={`arrivals.item.${index + 1}`}
    >
      <div className="relative overflow-hidden bg-section-gray aspect-square mb-3">
        <img
          src={getProductImage(product.category)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={handleWishlist}
          data-ocid={`arrivals.wishlist.${index + 1}`}
          disabled={addToWishlist.isPending}
          className="absolute top-3 right-3 w-8 h-8 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground hover:text-primary-foreground"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={14} strokeWidth={1.5} />
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-0.5">
          {stars.map((s, idx) => (
            <Star
              key={STAR_KEYS[idx]}
              size={12}
              fill={s.filled ? "oklch(var(--accent))" : "none"}
              stroke={
                s.filled
                  ? "oklch(var(--accent))"
                  : "oklch(var(--muted-foreground))"
              }
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({Number(product.rating)}/5)
          </span>
        </div>
        <h3 className="font-heading font-bold text-sm tracking-wide text-foreground">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-heading font-black text-base text-foreground">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
            data-ocid={`arrivals.add_to_cart.${index + 1}`}
            className="flex items-center gap-1.5 bg-foreground text-primary-foreground text-xs font-heading font-bold tracking-wider uppercase px-3 py-2 hover:bg-foreground/80 transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={12} />
            ADD
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function NewArrivals() {
  const { data: products, isLoading } = useAllProducts();
  const displayProducts = (
    products && products.length > 0 ? products : FALLBACK_PRODUCTS
  ).slice(0, 4);

  return (
    <section
      className="py-16 bg-background"
      id="new-arrivals"
      data-ocid="arrivals.section"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-widest text-center mb-10">
          NEW ARRIVALS
        </h2>
        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            data-ocid="arrivals.loading_state"
          >
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((key) => (
              <div key={key} className="space-y-3">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
