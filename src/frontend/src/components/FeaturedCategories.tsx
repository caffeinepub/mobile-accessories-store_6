import { motion } from "motion/react";

const CATEGORIES = [
  {
    name: "Cases",
    image: "/assets/generated/category-cases.dim_400x500.jpg",
    slug: "cases",
  },
  {
    name: "Power",
    image: "/assets/generated/category-power.dim_400x500.jpg",
    slug: "power",
  },
  {
    name: "Audio",
    image: "/assets/generated/category-audio.dim_400x500.jpg",
    slug: "audio",
  },
  {
    name: "Protection",
    image: "/assets/generated/category-protection.dim_400x500.jpg",
    slug: "protection",
  },
];

interface FeaturedCategoriesProps {
  onCategoryClick: (slug: string) => void;
}

export function FeaturedCategories({
  onCategoryClick,
}: FeaturedCategoriesProps) {
  return (
    <section
      className="py-16 max-w-[1200px] mx-auto px-4"
      id="categories"
      data-ocid="categories.section"
    >
      <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-widest text-center mb-10">
        FEATURED CATEGORIES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            type="button"
            key={cat.slug}
            onClick={() => onCategoryClick(cat.slug)}
            data-ocid={`categories.item.${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden aspect-[4/5] block text-left"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="font-heading font-black uppercase tracking-widest text-primary-foreground text-sm">
                {cat.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
