export const company = {
  name: "DPI Planning Center",
  description: "Laboratório digital especializado em serviços e soluções para odontologia digital.",
  address: "Av Juscelino Kubitschek, 900 - Sala 312, Francisco Bernardino - Juiz de Fora, MG",
  whatsapp: "+5532991392808",
  email: "dpiriobranco@gmail.com",
  instagram: null,
  facebook: null,
  logo: "/logo.png",
  logoHorizontal: "/image.png",
};

export const whatsappNumber = company.whatsapp.replace(/\D/g, "");

export const whatsappLink = `https://wa.me/${whatsappNumber}`;

export const defaultWhatsappMessage =
  "Olá, vim do site e gostaria de saber mais sobre os serviços da DPI Planning Center.";

export const getWhatsappUrl = (message: string = defaultWhatsappMessage) =>
  `${whatsappLink}?text=${encodeURIComponent(message)}`;

export const getServiceWhatsappMessage = (serviceName: string) =>
  `Olá, vim do site e gostaria de fazer um orçamento de ${serviceName}`;

export const formatWhatsapp = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");
  return `(${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
};

