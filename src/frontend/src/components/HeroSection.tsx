import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
  onExplore: () => void;
}

export function HeroSection({ onShopNow, onExplore }: HeroSectionProps) {
  return (
    <section
      className="bg-section-gray overflow-hidden"
      data-ocid="hero.section"
    >
      <div className="max-w-[1200px] mx-auto px-4 py-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-0 min-h-[520px] md:min-h-[600px]">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden md:flex justify-end items-end h-full"
          >
            <img
              src="/assets/generated/hero-left.dim_600x700.jpg"
              alt="Person holding a smartphone"
              className="h-[540px] w-auto object-cover object-top"
            />
          </motion.div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col items-center text-center px-6 md:px-10 py-16 md:py-20 max-w-sm mx-auto md:max-w-none"
          >
            <span className="font-body text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase">
              New Collection 2026
            </span>
            <h1 className="font-heading font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-foreground mb-4">
              GEAR UP
              <br />
              YOUR WORLD
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed max-w-[220px]">
              Premium accessories built for every phone, every lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onShopNow}
                data-ocid="hero.primary_button"
                className="bg-foreground text-primary-foreground font-heading font-bold text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-foreground/80 transition-colors"
              >
                SHOP NOW
              </button>
              <button
                type="button"
                onClick={onExplore}
                data-ocid="hero.secondary_button"
                className="border border-foreground text-foreground font-heading font-bold text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                EXPLORE
              </button>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden md:flex justify-start items-end h-full"
          >
            <img
              src="/assets/generated/hero-right.dim_600x700.jpg"
              alt="Person with wireless earbuds"
              className="h-[540px] w-auto object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
