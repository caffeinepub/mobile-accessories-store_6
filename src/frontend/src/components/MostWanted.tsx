import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { useAllProducts } from "../hooks/useQueries";
import { formatPrice, getProductImage } from "../utils/productHelpers";

const FALLBACK = [
  {
    id: 1n,
    name: "Crystal Clear Case",
    category: "cases" as any,
    price: 1999n,
    rating: 5n,
    description: "",
  },
  {
    id: 2n,
    name: "SlimCharge 10K",
    category: "power" as any,
    price: 4999n,
    rating: 4n,
    description: "",
  },
  {
    id: 3n,
    name: "AirBuds Pro X",
    category: "audio" as any,
    price: 7999n,
    rating: 5n,
    description: "",
  },
  {
    id: 4n,
    name: "Nano Shield Glass",
    category: "protection" as any,
    price: 1499n,
    rating: 4n,
    description: "",
  },
];

function MostWantedTile({
  product,
  index,
}: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group cursor-pointer"
      data-ocid={`mostwanted.item.${index + 1}`}
    >
      <div className="overflow-hidden aspect-square bg-section-gray mb-3">
        <img
          src={getProductImage(product.category)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="font-heading font-bold text-sm tracking-wide text-foreground mb-1">
        {product.name}
      </h3>
      <p className="font-body text-sm text-muted-foreground">
        {formatPrice(product.price)}
      </p>
    </motion.div>
  );
}

export function MostWanted() {
  const { data: products } = useAllProducts();
  const displayProducts = (
    products && products.length > 0 ? products : FALLBACK
  ).slice(0, 4);

  return (
    <section
      className="py-16 bg-section-gray"
      id="most-wanted"
      data-ocid="mostwanted.section"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-widest text-center mb-10">
          MOST WANTED GEAR
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts.map((product, i) => (
            <MostWantedTile
              key={String(product.id)}
              product={product}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
