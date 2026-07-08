import { Mail, MapPin } from "lucide-react";
import { company, formatWhatsapp, getWhatsappUrl } from "@/data/company";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function TopBar() {
  return (
    <div className="bg-black text-white py-3 px-4 text-sm">
      <div className="container flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 hover:text-pink-500 transition-colors text-xs md:text-sm"
          >
            <Mail size={16} />
            <span>{company.email}</span>
          </a>
          <div className="hidden md:flex items-center gap-2">
            <MapPin size={16} />
            <span className="text-gray-400">{company.address}</span>
          </div>
        </div>
        <a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-2 rounded font-semibold transition-colors text-xs md:text-sm"
        >
          <span>{formatWhatsapp(company.whatsapp)}</span>
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}
