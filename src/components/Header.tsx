import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { company, getWhatsappUrl } from "@/data/company";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container py-1 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            <img
              src={company.logo}
              alt={company.name}
              className="h-14 w-auto hover:opacity-80 transition-opacity"
            />
            <span className="text-sm md:text-lg font-bold text-gray-900 leading-tight">
              {company.name}
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="text-gray-700 hover:text-gray-900 transition-colors font-semibold text-sm">
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            <Button
              variant="default"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold flex items-center gap-2"
            >
              <span>Fazer Orçamento</span>
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <nav className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="text-gray-700 hover:text-gray-900 transition-colors font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button
                variant="default"
                className="bg-[#25D366] hover:bg-[#1ebe5d] text-white w-full font-semibold flex items-center justify-between gap-2"
              >
                <span>Fazer Orçamento</span>
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
