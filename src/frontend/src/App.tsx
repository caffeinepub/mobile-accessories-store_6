import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { FeaturedCategories } from "./components/FeaturedCategories";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { MostWanted } from "./components/MostWanted";
import { NewArrivals } from "./components/NewArrivals";
import { NewsletterFooter } from "./components/NewsletterFooter";
import { PromoBar } from "./components/PromoBar";
import { ShopByDevice } from "./components/ShopByDevice";
import { WhyChoose } from "./components/WhyChoose";

const queryClient = new QueryClient();

function StoreFront() {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    scrollToSection("categories");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <Header
        onCartOpen={() => setCartOpen(true)}
        onSearch={() => scrollToSection("new-arrivals")}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main className="flex-1">
        <HeroSection
          onShopNow={() => scrollToSection("new-arrivals")}
          onExplore={() => scrollToSection("categories")}
        />
        <FeaturedCategories
          onCategoryClick={(slug) => setActiveCategory(slug)}
        />
        <NewArrivals />
        <MostWanted />
        <ShopByDevice />
        <WhyChoose />
      </main>
      <NewsletterFooter />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreFront />
    </QueryClientProvider>
  );
}
