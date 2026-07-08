import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { services, reviews } from "@/data/services";
import { getWhatsappUrl } from "@/data/company";
import { Link } from "wouter";
import { Clock, Users, Zap } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Home() {
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
      <section className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black text-white py-12 md:py-40 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gray-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-xs md:text-sm font-semibold mb-2 md:mb-3 uppercase tracking-widest">
                Soluções Digitais Inovadoras
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight font-serif">
                Explore Serviços Digitais Inovadores para Odontologia!
              </h1>
              <p className="text-base md:text-lg text-gray-200 mb-3 md:mb-4">
                Revolucionando a Radiologia Odontológica, clínicas e consultórios com Soluções Digitais.
              </p>
              <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8">
                Transforme seus exames odontológicos em soluções digitais de alta precisão. Serviços especializados para planejamento cirúrgico, implantes e reabilitações.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg font-semibold flex items-center justify-between gap-2">
                    <span>Entrar em contato</span>
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  </Button>
                </a>
                <Link href="/servicos">
                  <Button
                    className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-6 text-lg font-semibold"
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
                {/* Icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl">🦷</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Services CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="flex flex-col gap-4 md:gap-6 items-center">
            {/* Primeira linha: 1 botão centralizado */}
            <div className="w-full md:w-auto">
              {services.slice(0, 1).map((service) => (
                <a key={service.id} href={`/servicos#${service.id}`} className="block px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center animate-fade-in-up cursor-pointer animate-delay-100" onMouseEnter={(e) => { e.currentTarget.style.animation = 'bounce 0.6s ease-in-out'; }} onAnimationEnd={(e) => { e.currentTarget.style.animation = ''; }}>{service.name}</a>
              ))}
            </div>
            {/* Segunda linha: 2 botões lado a lado */}
            <div className="flex gap-3 md:gap-4 w-full md:w-auto">
              {services.slice(1, 3).map((service) => (
                <a key={service.id} href={`/servicos#${service.id}`} className="flex-1 px-4 md:px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center animate-fade-in-up cursor-pointer text-sm md:text-base" onMouseEnter={(e) => { e.currentTarget.style.animation = 'bounce 0.6s ease-in-out'; }} onAnimationEnd={(e) => { e.currentTarget.style.animation = ''; }}>{service.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - "Onde a Inovação Encontra o Cuidado Odontológico" */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container" id="servicos">
          <div className="mb-16">
            <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-widest">
              Onde a Inovação Encontra o Cuidado Odontológico
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif">
              Nossos Serviços
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          
          <div className="text-center mt-12">
            <Link href="/servicos">
              <Button
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg font-semibold"
              >
                Ver mais produtos/serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - "Bem-vindo à DPI Planning Center!" */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-linear-to-br from-gray-800 to-gray-700 rounded-lg p-8 text-white h-96 flex items-center justify-center">
                <p className="text-lg text-center font-semibold">
                  Laboratório Digital Equipado com Tecnologia de Ponta
                </p>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-widest">
              Atendimento
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif">
              Horários de Funcionamento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map((day) => (
              <div key={day} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <p className="font-semibold text-black mb-2">{day}</p>
                <p className="text-gray-700 font-bold">08:00 - 18:00</p>
              </div>
            ))}
          </div>

          <div className="text-center">
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
        <div className="container text-center">
          <p className="text-gray-300 text-sm font-semibold mb-3 uppercase tracking-widest">
            Tecnologia de Ponta para um Atendimento Odontológico de Excelência
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Onde a Inovação Encontra o Cuidado Odontológico.
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Oferecemos uma ampla gama de serviços digitais para sua Radiologia Odontológica. Conheça nossos serviços, estamos aqui para trazer o melhor da tecnologia para sua prática clínica.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-6 text-lg font-semibold flex items-center justify-between gap-3">
                <span>Conversar no WhatsApp</span>
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
              </Button>
            </a>
            <Link href="/contato">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
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
