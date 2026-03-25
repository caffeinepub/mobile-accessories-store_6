import { HeadphonesIcon, Shield, Truck, Zap } from "lucide-react";
import { motion } from "motion/react";

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Premium Quality",
    desc: "Every product is tested to the highest standards for performance and durability.",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    desc: "All accessories covered by our comprehensive 2-year manufacturer's warranty.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Free shipping on orders over $50. Express 2-day delivery available.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Our expert team is available around the clock to help with any questions.",
  },
];

export function WhyChoose() {
  return (
    <section
      className="py-16 bg-background border-t border-border"
      data-ocid="whychoose.section"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-widest text-center mb-12">
          WHY CHOOSE MOBILEX
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {VALUE_PROPS.map((vp, i) => (
            <motion.div
              key={vp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
              data-ocid={`whychoose.item.${i + 1}`}
            >
              <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                <vp.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-2">
                {vp.title}
              </h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {vp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
