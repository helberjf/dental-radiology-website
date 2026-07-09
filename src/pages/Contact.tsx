import React from "react";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company, getWhatsappUrl, formatWhatsapp } from "@/data/company";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.message
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create WhatsApp message
      const message = `*Contato via Website - DPI Planning Center*\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*WhatsApp:* ${formData.whatsapp}\n*Assunto:* ${formData.subject || "Sem assunto"}\n\n*Mensagem:*\n${formData.message}`;

      const whatsappUrl = `https://wa.me/55${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      // Reset form
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        subject: "",
        message: "",
      });

      toast.success("Redirecionando para WhatsApp...");
    } catch {
      toast.error("Erro ao processar formulário");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gray-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10 text-center">
          <p className="text-gray-300 text-sm font-semibold mb-3 uppercase tracking-widest">
            CONTATO
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            Entre em Contato
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Estamos aqui para ajudar com suas necessidades de odontologia digital
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Email Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-800 text-white p-4 rounded-lg">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-semibold text-black">E-mail</h3>
              </div>
              <a
                href={`mailto:${company.email}`}
                className="text-gray-700 hover:text-gray-900 font-semibold text-lg break-all"
              >
                {company.email}
              </a>
              <p className="text-gray-500 text-sm mt-2">Responderemos em breve</p>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#25D366] text-white p-4 rounded-lg">
                  <Phone size={28} />
                </div>
                <h3 className="text-xl font-semibold text-black">WhatsApp</h3>
              </div>
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] font-semibold text-lg"
              >
                {formatWhatsapp(company.whatsapp)}
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <p className="text-gray-500 text-sm mt-2">Atendimento rápido</p>
            </div>

            {/* Address Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-800 text-white p-4 rounded-lg">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-semibold text-black">Endereço</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{company.address}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 rounded-lg border border-gray-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 font-serif">
                Envie sua Mensagem
              </h2>
              <p className="text-gray-600 mb-8">
                Preencha o formulário abaixo e entraremos em contato com você via WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Nome *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-semibold">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(32) 99139-2808"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="mt-2 bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Qual é o assunto da sua mensagem?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2 bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-semibold">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva sua necessidade em detalhes..."
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 min-h-40 bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-6 text-lg font-semibold flex items-center justify-between gap-3"
                >
                  {isSubmitting ? (
                    <span className="w-full text-center">Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar via WhatsApp</span>
                      <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Pronto para começar?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Entre em contato e descubra como podemos ajudar sua prática odontológica a alcançar um novo nível de atendimento.
          </p>
          <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-6 text-lg font-semibold flex items-center justify-between gap-3">
              <span>Conversar no WhatsApp</span>
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
