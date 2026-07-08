import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { ReviewForm } from "@/components/ReviewForm";
import { services, reviews, Review } from "@/data/services";
import { getWhatsappUrl, getServiceWhatsappMessage } from "@/data/company";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Services() {
  const [allReviews, setAllReviews] = useState<Review[]>(reviews);

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
            SERVIÇOS
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            Nossos Serviços
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Soluções completas de odontologia digital para sua prática
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const stats = getServiceStats(service.id);
              return (
                <div
                  key={service.id}
                  className={`animate-fade-in-up ${
                    index === 0 ? 'animate-delay-100' : index === 1 ? 'animate-delay-200' : 'animate-delay-300'
                  }`}
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
                <div className="md:col-span-2">
                  <div className="mb-8">
                    <div className="text-6xl mb-6">{service.icon}</div>
                    <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-widest">
                      Serviço
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-serif">
                      {service.name}
                    </h2>
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
                            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
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
                  <div className="bg-gradient-to-br from-gray-800 to-black text-white p-8 rounded-lg mb-8 sticky top-24">
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
                  </div>

                  {/* Review Form */}
                  <ReviewForm
                    serviceId={service.id}
                    onSubmit={(data) =>
                      handleReviewSubmit(service.id, data)
                    }
                  />
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
