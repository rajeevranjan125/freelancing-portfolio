import { useState } from 'react';

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#strategy", label: "Cloud Strategy" },
  { href: "#projects", label: "Projects" },
  { href: "#calculator", label: "Cost Calculator" },
  { href: "#why-me", label: "Why Me" }
];

export default function SiteHeader({ personal, onOpenScheduler }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="https://res.cloudinary.com/dyy8sqeh7/image/upload/v1779719415/notionists-1779719391796_dx82bd.png"
              alt="Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-black group-hover:text-neutral-600 transition-colors">{personal.name}</span>
              <span className="text-xs text-neutral-500 font-medium">{personal.role}</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-black text-[10px] font-extrabold uppercase tracking-widest text-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-black inline-block"></span>
              <span>{personal.availability}</span>
            </div>

            <button
              onClick={onOpenScheduler}
              className="hidden sm:inline-block px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-sm font-semibold transition-all duration-300 shadow-sm border border-black"
            >
              Book a Call
            </button>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-lg p-6 space-y-4 shadow-xl flex flex-col">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-sm font-semibold text-neutral-600 hover:text-black transition-colors py-2 ${
                index < NAV_LINKS.length - 1 ? 'border-b border-neutral-100' : ''
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
            <span className="text-xs text-neutral-500 font-semibold text-center">{personal.availability}</span>
            <button
              onClick={() => {
                closeMenu();
                onOpenScheduler();
              }}
              className="w-full py-3 rounded-xl bg-black text-white text-sm font-bold shadow-md text-center border border-black hover:bg-neutral-800"
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}
