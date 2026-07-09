import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { ReviewForm } from "@/components/ReviewForm";
import { services, reviews, Review } from "@/data/services";
import { getWhatsappUrl, getServiceWhatsappMessage } from "@/data/company";
import { Button } from "@/components/ui/button";
import { ChevronDown, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Services() {
  const [allReviews, setAllReviews] = useState<Review[]>(reviews);
  const [openReviewForms, setOpenReviewForms] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

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
  }, [allReviews.length]);

  // Calculate average rating per service
  const getServiceStats = (serviceId: string) => {
    const serviceReviews = allReviews.filter((r) => r.serviceId === serviceId);
    const avgRating =
      serviceReviews.length > 0
        ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) /
          serviceReviews.length
        : 0;
    return { count: serviceReviews.length, average: avgRating };
  };

  const getServiceReviews = (serviceId: string) => {
    return allReviews.filter((r) => r.serviceId === serviceId);
  };

  const handleReviewSubmit = (
    serviceId: string,
    data: {
      rating: number;
      comment: string;
      author: string;
      email: string;
    }
  ) => {
    const newReview: Review = {
      id: String(allReviews.length + 1),
      serviceId,
      rating: data.rating,
      comment: data.comment,
      author: data.author,
      email: data.email,
      date: new Date().toISOString().split("T")[0],
    };
    setAllReviews([...allReviews, newReview]);
    toast.success("Avaliação adicionada com sucesso!");
  };

  const handleAddToCart = (serviceId: string, serviceName: string, price: number) => {
    const event = new CustomEvent("addToCart", {
      detail: { serviceId, serviceName, price },
    });
    window.dispatchEvent(event);
  };

  const toggleReviewForm = (serviceId: string) => {
    setOpenReviewForms((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gray-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10 text-center">
          <p className="text-gray-300 text-sm font-semibold mb-2 uppercase tracking-widest">
            SERVIÇOS
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif">
            Nossos Serviços
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Soluções completas de odontologia digital para sua prática
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const stats = getServiceStats(service.id);
              return (
                <div
                  key={service.id}
                  id={`card-${service.id}`}
                  className={`reveal-on-scroll ${
                    index === 0 ? 'animate-delay-100' : index === 1 ? 'animate-delay-200' : 'animate-delay-300'
                  } scroll-mt-24`}
                >
                  <ServiceCard
                  key={service.id}
                  service={service}
                  reviewCount={stats.count}
                  averageRating={stats.average}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      {services.map((service) => {
        const stats = getServiceStats(service.id);
        const serviceReviews = getServiceReviews(service.id);

        return (
          <section
            key={service.id}
            id={service.id}
            className="py-16 md:py-24 border-t border-gray-200"
          >
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Service Details */}
                <div className="md:col-span-2 reveal-on-scroll animate-delay-100">
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-5xl md:text-6xl">{service.icon}</div>
                      <h2 className="text-4xl md:text-5xl font-bold text-black font-serif">
                        {service.name}
                      </h2>
                    </div>
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Rating */}
                    {stats.count > 0 && (
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={24}
                              className={
                                i < Math.round(stats.average)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-gray-700 font-semibold">
                          {stats.average.toFixed(1)} ({stats.count}{" "}
                          {stats.count === 1 ? "avaliação" : "avaliações"})
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href={getWhatsappUrl(getServiceWhatsappMessage(service.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-6 text-lg font-semibold flex items-center justify-between gap-2">
                        <span>Solicitar Orçamento</span>
                        <WhatsAppIcon className="w-5 h-5 shrink-0" />
                      </Button>
                    </a>
                  </div>

                  {/* Reviews */}
                  <div className="mt-12">
                    <h3 className="text-3xl font-bold text-black mb-8 font-serif">
                      Avaliações ({serviceReviews.length})
                    </h3>

                    {serviceReviews.length > 0 ? (
                      <div className="space-y-6 mb-12">
                        {serviceReviews.map((review) => (
                          <div
                            key={review.id}
                            className="bg-gray-50 p-6 rounded-lg border border-gray-200 reveal-on-scroll"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <p className="font-semibold text-black text-lg">
                                  {review.author}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString(
                                    "pt-BR"
                                  )}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={18}
                                    className={
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 mb-12 text-lg">
                        Nenhuma avaliação ainda. Seja o primeiro a avaliar este serviço!
                      </p>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  {/* Price Card */}
                  <div className="bg-gradient-to-br from-gray-800 to-black text-white p-8 rounded-lg mb-8 reveal-on-scroll animate-delay-200">
                    <p className="text-gray-300 text-sm font-semibold mb-2 uppercase tracking-widest">
                      Preço do Serviço
                    </p>
                    <p className="text-5xl font-bold mb-4">
                      R$ {service.price.toFixed(2)}
                    </p>
                    <p className="text-gray-300 text-sm mb-8">
                      Conversão de alta precisão com suporte profissional
                    </p>
                    <a
                      href={getWhatsappUrl(getServiceWhatsappMessage(service.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-6 text-lg font-semibold flex items-center justify-between gap-2">
                        <span>Solicitar Orçamento</span>
                        <WhatsAppIcon className="w-5 h-5 shrink-0" />
                      </Button>
                    </a>
                    <Button
                      onClick={() => handleAddToCart(service.id, service.name, service.price)}
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5 shrink-0" />
                      <span>Adicionar ao Carrinho</span>
                    </Button>
                  </div>

                  {/* Review Form */}
                  <div className="reveal-on-scroll animate-delay-300">
                    <button
                      onClick={() => toggleReviewForm(service.id)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between"
                    >
                      Deixe sua avaliação
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${openReviewForms[service.id] ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openReviewForms[service.id] && (
                      <div className="mt-3">
                        <ReviewForm
                          serviceId={service.id}
                          onSubmit={(data) =>
                            handleReviewSubmit(service.id, data)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
}
