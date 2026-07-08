import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { company, formatWhatsapp, getWhatsappUrl } from "@/data/company";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 md:py-20">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Company Info */}
        <div>
          <img
            src={company.logo}
            alt={company.name}
            className="h-12 w-auto mb-6"
          />
          <p className="text-gray-400 text-sm leading-relaxed">{company.description}</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-6 text-white text-lg">Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/">
                <a className="hover:text-pink-500 transition-colors">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/servicos">
                <a className="hover:text-pink-500 transition-colors">Serviços</a>
              </Link>
            </li>
            <li>
              <Link href="/contato">
                <a className="hover:text-pink-500 transition-colors">Contato</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-6 text-white text-lg">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-6 text-white text-lg">Contato</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{company.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href={`mailto:${company.email}`}
                className="hover:text-white transition-colors"
              >
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-pink-500 transition-colors"
              >
                {formatWhatsapp(company.whatsapp)}
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
        <p>
          &copy; {currentYear} {company.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
