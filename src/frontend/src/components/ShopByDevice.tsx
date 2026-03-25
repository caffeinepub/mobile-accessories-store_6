import { motion } from "motion/react";
import { useState } from "react";

const DEVICES = ["Apple", "Samsung", "Google"];

export function ShopByDevice() {
  const [active, setActive] = useState("Apple");

  return (
    <section className="py-16 bg-background" data-ocid="shopbydevice.section">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-widest mb-10">
          SHOP BY DEVICE
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {DEVICES.map((device) => (
            <motion.button
              type="button"
              key={device}
              onClick={() => setActive(device)}
              whileTap={{ scale: 0.97 }}
              data-ocid={`shopbydevice.${device.toLowerCase()}.button`}
              className={`font-heading font-bold text-sm tracking-widest uppercase px-10 py-3.5 rounded-full border transition-colors ${
                active === device
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-background text-foreground border-foreground hover:bg-foreground hover:text-primary-foreground"
              }`}
            >
              {device}
            </motion.button>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mt-6 font-body">
          Showing accessories compatible with{" "}
          <span className="font-semibold text-foreground">{active}</span>{" "}
          devices
        </p>
      </div>
    </section>
  );
}
