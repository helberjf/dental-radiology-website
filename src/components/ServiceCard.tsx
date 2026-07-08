import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Service } from "@/data/services";
import { getWhatsappUrl, getServiceWhatsappMessage } from "@/data/company";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface ServiceCardProps {
  service: Service;
  reviewCount?: number;
  averageRating?: number;
}

export function ServiceCard({
  service,
}: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const whatsappUrl = getWhatsappUrl(getServiceWhatsappMessage(service.name));
    window.open(whatsappUrl, "_blank");
  };

  const handleAddToCart = () => {
    const event = new CustomEvent('addToCart', { 
      detail: { 
        serviceId: service.id, 
        serviceName: service.name, 
        price: service.price 
      } 
    });
    window.dispatchEvent(event);
    // Toast será disparado pelo Cart.tsx
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-5xl mb-4">{service.icon}</div>
        <h3 className="text-2xl font-bold text-black mb-2 font-serif">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm">{service.description}</p>
      </div>

      {/* Price */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-gray-600 text-sm mb-1">Preço do Serviço</p>
        <p className="text-3xl font-bold text-green-600">
          R$ {service.price.toFixed(2)}
        </p>
      </div>

      {/* Buttons */}
      <div className="p-6 space-y-3">
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between gap-2"
        >
          <span>Solicitar Serviço</span>
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-between"
        >
          Ver Detalhes
          <ChevronDown
            size={20}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <button
          onClick={() => {
            handleAddToCart();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>

      {/* Toggle Description */}
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-700 text-sm leading-relaxed">
            {service.fullDescription}
          </p>
        </div>
      )}

      {/* Review Section */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <p className="text-sm text-gray-600 mb-3">Avalie este serviço:</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="text-2xl hover:scale-110 transition-transform"
              title={`${star} estrela${star > 1 ? "s" : ""}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
