import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../hooks/useQueries";

interface HeaderProps {
  onCartOpen: () => void;
  onSearch: () => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const NAV_LINKS = ["Phones", "Cases", "Power", "Audio", "Protection", "Sale"];

export function Header({
  onCartOpen,
  onSearch,
  activeCategory,
  onCategoryChange,
}: HeaderProps) {
  const { data: cart } = useCart();
  const cartCount = cart?.length ?? 0;

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="font-heading font-black text-xl tracking-[0.15em] text-foreground">
            MOBILEX
          </span>
        </div>

        {/* Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => onCategoryChange(link)}
              data-ocid={`nav.${link.toLowerCase()}.link`}
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                link === "Sale"
                  ? "text-accent font-semibold"
                  : activeCategory === link
                    ? "text-foreground border-b-2 border-foreground pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onSearch}
            data-ocid="header.search_input"
            className="text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            data-ocid="header.user.button"
            className="text-foreground hover:text-muted-foreground transition-colors hidden sm:block"
            aria-label="Account"
          >
            <User size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            data-ocid="header.wishlist.button"
            className="text-foreground hover:text-muted-foreground transition-colors hidden sm:block"
            aria-label="Wishlist"
          >
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onCartOpen}
            data-ocid="header.cart.button"
            className="text-foreground hover:text-muted-foreground transition-colors relative"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-foreground text-primary-foreground text-[10px] font-heading font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
