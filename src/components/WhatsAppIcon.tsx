import { FaWhatsapp } from "react-icons/fa";

type WhatsAppIconProps = {
  className?: string;
};

export function WhatsAppIcon({ className = "w-5 h-5" }: WhatsAppIconProps) {
  return <FaWhatsapp className={className} aria-hidden="true" />;
}
