import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { services, reviews } from "@/data/services";
import { company, getWhatsappUrl } from "@/data/company";
import { Link } from "wouter";
import { Clock, Users, Zap } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Calculate average rating per service
  const getServiceStats = (serviceId: string) => {
    const serviceReviews = reviews.filter((r) => r.serviceId === serviceId);
    const avgRating =
      serviceReviews.length > 0
        ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) /
          serviceReviews.length
        : 0;
    return { count: serviceReviews.length, average: avgRating };
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />
      <Header />

      {/* Hero Section - Redesigned */}
      <section className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-6 pb-10 md:pt-20 md:pb-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gray-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="max-w-2xl reveal-on-scroll">
              <p className="text-gray-300 text-xs md:text-sm font-semibold mb-3 uppercase tracking-[0.18em]">
                Soluções Digitais Inovadoras
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-5 md:mb-6 leading-[1.05] font-serif">
                Precisão Digital para <span className="text-[#4e82e2]">Odontologia</span> de Alto Nível
              </h1>
              <p className="text-base md:text-lg text-gray-200 mb-3 md:mb-4 leading-relaxed">
                Planejamento, conversão e integração de exames com padrão técnico, agilidade e suporte especializado.
              </p>
              <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Transforme arquivos tomográficos e escaneamentos em fluxos digitais confiáveis para cirurgia guiada, implantes e reabilitação.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
                <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <Button className="w-auto bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold flex items-center justify-between gap-2">
                    <span>Entrar em contato</span>
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  </Button>
                </a>
                <Link href="/servicos">
                  <Button
                    className="w-auto bg-gray-700 hover:bg-gray-600 text-white px-8 py-5 md:py-6 text-base md:text-lg font-semibold"
                  >
                    Ver Serviços
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-80 h-80">
                {/* Circular decoration */}
                <div className="absolute inset-0 border-2 border-gray-500 rounded-full opacity-30"></div>
                <div className="absolute inset-8 border border-gray-400 rounded-full opacity-20"></div>
                {/* Brand icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-48 h-48 object-contain rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Services CTA Section */}
      <section className="pt-4 pb-10 md:py-10 bg-white">
        <div className="container">
          <div className="flex flex-col gap-4 md:gap-2 items-center reveal-on-scroll">
            <p className="text-xs text-gray-500 font-medium text-center">
              Clique para selecionar um serviço
            </p>
            {/* Primeira linha: 1 botão centralizado */}
            <div className="w-full max-w-xs md:w-auto md:max-w-none">
              {services.slice(0, 1).map((service) => (
                <a key={service.id} href={`/servicos#card-${service.id}`} className="relative z-10 block px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-center cursor-pointer">{service.name}</a>
              ))}
            </div>
            {/* Segunda linha: 2 botões lado a lado */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-lg md:w-auto md:max-w-none">
              {services.slice(1, 3).map((service) => (
                <a key={service.id} href={`/servicos#card-${service.id}`} className="relative z-10 flex-1 px-4 md:px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-center cursor-pointer text-sm md:text-base">{service.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - "Onde a Inovação Encontra o Cuidado Odontológico" */}
      <section className="py-1 md:py-24 bg-gray-50">
        <div className="container" id="servicos">
          <div className="mb-8 reveal-on-scroll">
            <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-widest">
              Onde a Inovação Encontra o Cuidado Odontológico
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif">
              Nossos Serviços
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-0.5 reveal-on-scroll">
            {services.map((service) => {
              const stats = getServiceStats(service.id);
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  reviewCount={stats.count}
                  averageRating={stats.average}
                />
              );
            })}
          </div>
          
          <div className="text-center mt-12 reveal-on-scroll">
            <Link href="/servicos">
              <Button
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg font-semibold"
              >
                Ver serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - "Bem-vindo à DPI Planning Center!" */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 reveal-on-scroll">
            <div>
              <img
                src="/lab.png"
                alt="Laboratório Digital Equipado com Tecnologia de Ponta"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-widest">
                Inovação Digital em Odontologia ao Seu Alcance
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-serif">
                Bem-vindo à DPI Planning Center!
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Especializada em serviços e soluções digitais em Odontologia. Transformamos a maneira como você cuida da saúde bucal com tecnologia de ponta.
              </p>
              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                Oferecemos uma ampla gama de serviços digitais que visam inserir dentistas e clínicas na nova era da odontologia. Desde conversão de arquivos até soluções de planejamento digital, estamos aqui para trazer o melhor da tecnologia para sua prática.
              </p>
              <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-6 text-lg font-semibold flex items-center justify-between gap-2">
                  <span>Entrar em Contato</span>
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                </Button>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-on-scroll">
            <div className="bg-gray-800 text-white p-8 rounded-lg">
              <Zap size={40} className="mb-4 text-gray-300" />
              <h3 className="text-2xl font-bold mb-3 font-serif">Tecnologia de Ponta</h3>
              <p className="text-gray-300">
                Utilizamos os recursos mais avançados para garantir diagnósticos assertivos e confiáveis.
              </p>
            </div>
            <div className="bg-gray-800 text-white p-8 rounded-lg">
              <Users size={40} className="mb-4 text-gray-300" />
              <h3 className="text-2xl font-bold mb-3 font-serif">Especialização</h3>
              <p className="text-gray-300">
                Nossa equipe é composta por especialistas apaixonados por inovação e excelência em odontologia.
              </p>
            </div>
            <div className="bg-gray-800 text-white p-8 rounded-lg">
              <Clock size={40} className="mb-4 text-gray-300" />
              <h3 className="text-2xl font-bold mb-3 font-serif">Qualidade & Comprometimento</h3>
              <p className="text-gray-300">
                Oferecemos soluções digitais adaptadas às suas necessidades específicas com máxima qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horários Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16 reveal-on-scroll">
            <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-widest">
              Atendimento
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif">
              Horários de Funcionamento
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12 reveal-on-scroll">
  
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33%-0.5rem)]">
              <p className="font-semibold text-black mb-2">Segunda a Sexta</p>
              <p className="text-gray-700 font-bold">08:00 - 18:00</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33%-0.5rem)]">
              <p className="font-semibold text-black mb-2">Sábado</p>
              <p className="text-gray-700 font-bold">09:00 - 12:00</p>
            </div>
    
          </div>

          <div className="text-center reveal-on-scroll">
            <p className="text-gray-600 text-lg mb-6">
              Entre em contato e descubra como podemos ajudar sua prática odontológica.
            </p>
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-6 text-lg font-semibold flex items-center justify-between gap-2">
                <span>Entrar em contato</span>
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-gray-900 to-black text-white">
        <div className="container text-center reveal-on-scroll">
          <p className="text-gray-300 text-sm font-semibold mb-1 uppercase tracking-widest">
            Tecnologia de Ponta para um Atendimento Odontológico de Excelência
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Onde a Inovação Encontra o Cuidado Odontológico.
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Oferecemos uma ampla gama de serviços digitais para sua Radiologia Odontológica. Conheça nossos serviços, estamos aqui para trazer o melhor da tecnologia para sua prática clínica.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-6 text-lg font-semibold flex items-center justify-between gap-3">
                <span>Conversar no WhatsApp</span>
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
              </Button>
            </a>
            <Link href="/contato">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-8 py-6 text-lg"
              >
                Enviar Mensagem
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
