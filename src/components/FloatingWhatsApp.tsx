import { X } from "lucide-react";
import { useState } from "react";
import { company, getWhatsappUrl } from "@/data/company";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Abrir WhatsApp"
        >
          {isOpen ? (
            <X size={24} className="md:w-7 md:h-7" />
          ) : (
            <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" />
          )}
        </button>

        {/* Popup Menu */}
        {isOpen && (
          <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-80 p-6 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-lg font-bold text-black mb-2">Olá! 👋</h3>
            <p className="text-gray-600 text-sm mb-4">
              Estamos aqui para ajudar com seus serviços de odontologia digital. Clique abaixo para conversar no WhatsApp!
            </p>
            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 px-4 rounded-lg transition-colors w-full"
            >
              <span>Conversar no WhatsApp</span>
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
            </a>
            <p className="text-gray-500 text-xs mt-3 text-center">
              {company.whatsapp}
            </p>
          </div>
        )}
    </>
  );
}
