import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";

// Swap these for your router's Link component (react-router, etc).
// `href` is used as a plain anchor here so the file runs standalone.
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

const FOOTER_TEXT =
  import.meta.env.VITE_FOOTER_TEXT ||
  "Tashkent, Uzbekistan — open to backend & ML roles.";
const EMAIL = import.meta.env.VITE_EMAIL || "you@example.com";
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || "";
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || "";
const TELEGRAM_URL = import.meta.env.VITE_TELEGRAM_URL || "";

interface LayoutProps {
  children: ReactNode;
  active?: string;
}

export default function Layout({ children, active = "Home" }: LayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <header className="border-b border-line">
        <div className="max-w-content mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">
            Maksudbek Dehqonaliyev
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm pb-1 border-b transition-colors ${
                  item.label === active
                    ? "border-signal text-ink"
                    : "border-transparent text-slate hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden fixed top-16 inset-x-0 bg-paper border-b border-line shadow-lg px-6 py-3 flex flex-col gap-3 z-50">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${
                  item.label === active ? "text-signal" : "text-slate"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-line mt-24">
        <div className="max-w-content mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate">{FOOTER_TEXT}</p>
          <div className="flex items-center gap-5">
            {EMAIL && (
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-slate hover:text-ink">
                <Mail size={18} />
              </a>
            )}
            {GITHUB_URL && (
              <a href={GITHUB_URL} aria-label="GitHub" className="text-slate hover:text-ink">
                <FaGithub size={18} />
              </a>
            )}
            {LINKEDIN_URL && (
              <a href={LINKEDIN_URL} aria-label="LinkedIn" className="text-slate hover:text-ink">
                <FaLinkedin size={18} />
              </a>
            )}
            {TELEGRAM_URL && (
              <a href={TELEGRAM_URL} aria-label="Telegram" className="text-slate hover:text-ink">
                <FaTelegram size={18} />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}