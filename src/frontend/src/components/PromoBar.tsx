import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PROMOS = [
  "FREE SHIPPING ON ORDERS OVER $50 — USE CODE: FREESHIP",
  "10% OFF YOUR FIRST ORDER — USE CODE: WELCOME10",
  "NEW ARRIVALS JUST DROPPED — SHOP THE LATEST GEAR",
];

export function PromoBar() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % PROMOS.length);
  };

  return (
    <button
      type="button"
      className="w-full bg-foreground text-primary-foreground h-8 flex items-center justify-center text-xs tracking-widest font-heading font-semibold cursor-pointer select-none overflow-hidden"
      onClick={handleNext}
      data-ocid="promobar.button"
      aria-label="Next promotion"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {PROMOS[index]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
