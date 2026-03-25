import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FOOTER_LINKS = {
  Shop: ["Cases", "Power", "Audio", "Protection", "Sale", "New Arrivals"],
  Support: ["Help Center", "Track Order", "Returns", "Warranty", "Contact Us"],
  Company: ["About Us", "Careers", "Press", "Sustainability", "Affiliates"],
};

const SOCIAL_ICONS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
];

export function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    toast.success("Thanks for subscribing!");
  };

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="bg-footer-bg text-primary-foreground"
      data-ocid="footer.section"
    >
      <div className="max-w-[1200px] mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-heading font-black text-xl tracking-[0.15em] mb-4 block">
              MOBILEX
            </span>
            <p className="text-footer-muted text-sm font-body leading-relaxed mb-6 max-w-xs">
              Premium mobile accessories for every device and lifestyle. Quality
              gear, delivered fast.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                data-ocid="footer.newsletter.input"
                className="flex-1 bg-white/10 border border-white/20 text-primary-foreground placeholder:text-footer-muted text-xs font-body px-4 py-3 outline-none focus:border-white/60 transition-colors min-w-0"
              />
              <button
                type="submit"
                data-ocid="footer.newsletter.submit_button"
                disabled={submitted}
                className="bg-primary-foreground text-foreground font-heading font-bold text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary-foreground/90 transition-colors disabled:opacity-60 flex-shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {SOCIAL_ICONS.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-footer-muted hover:text-primary-foreground hover:border-white/60 transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-heading font-bold text-xs tracking-widest uppercase mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="/"
                      className="text-footer-muted text-sm font-body hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-footer-muted text-xs font-body">
            © {year}. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-2 text-footer-muted">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((pay) => (
              <span
                key={pay}
                className="border border-white/20 px-2 py-1 text-[9px] font-heading font-bold tracking-wider"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
