import { ShoppingCart, X, Trash2, CheckCircle, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/data/company";
import { toast } from "sonner";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface CartItem {
  serviceId: string;
  serviceName: string;
  price: number;
  quantity: number;
}

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    const savedCart = localStorage.getItem('dpi-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('dpi-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Listener para adicionar ao carrinho
  useEffect(() => {
      const handleAddToCart = (event: Event) => {
        const customEvent = event as CustomEvent;
        const { serviceId, serviceName, price } = customEvent.detail;
        
        setCartItems((prevItems) => {
          const existing = prevItems.find((item) => item.serviceId === serviceId);
          let newItems;
          if (existing) {
            newItems = prevItems.map((item) =>
              item.serviceId === serviceId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newItems = [...prevItems, { serviceId, serviceName, price, quantity: 1 }];
          }
          
          // Toast de sucesso
          toast.success(`${serviceName} adicionado ao carrinho!`, {
            description: `Preço: R$ ${price.toFixed(2)}`,
            duration: 3000,
          });
          
          return newItems;
        });
      };

    window.addEventListener('addToCart', handleAddToCart);
    return () => window.removeEventListener('addToCart', handleAddToCart);
  }, []);

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const removeFromCart = (serviceId: string) => {
    setCartItems(cartItems.filter((item) => item.serviceId !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.serviceId === serviceId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    const itemsList = cartItems
      .map((item) => {
        const subtotal = (item.price * item.quantity).toFixed(2);
        return `📌 ${item.serviceName}\n   Quantidade: ${item.quantity}x\n   Preço unitário: R$ ${item.price.toFixed(2)}\n   Subtotal: R$ ${subtotal}`;
      })
      .join("\n\n");

    const message = `🦷 *SOLICITAÇÃO DE ORÇAMENTO - DPI PLANNING CENTER*\n\n👋 Olá! Vim do site e gostaria de fazer um orçamento dos seguintes serviços:\n\n${itemsList}\n\n${'─'.repeat(40)}\n\n💰 *RESUMO DO PEDIDO*\n📊 Quantidade de itens: ${cartItems.length}\n📈 Total de serviços: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}\n💵 *Valor Total: R$ ${total.toFixed(2)}*\n\n${'─'.repeat(40)}\n\n⏰ Aguardo retorno com a confirmação de disponibilidade e próximos passos.\n\nObrigado!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappLink}?text=${encodedMessage}`, "_blank");
    
    // Toast de sucesso
    toast.success('Pedido enviado com sucesso!', {
      description: 'Você será redirecionado para o WhatsApp',
      duration: 3000,
    });
    
    // Limpar carrinho após enviar
    setTimeout(() => {
      setCartItems([]);
      localStorage.removeItem('dpi-cart');
    }, 1000);
    
    setShowConfirmation(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Cart Button - Floating */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-40 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
        aria-label="Abrir carrinho"
      >
        <div className="relative">
          <ShoppingCart size={24} className="md:w-7 md:h-7" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {cartItems.length}
            </span>
          )}
        </div>
      </button>

      {/* Cart Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <ShoppingCart size={32} />
              <h1 className="text-2xl md:text-3xl font-bold">Meu Carrinho</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 md:p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Fechar carrinho"
            >
              <X size={24} className="md:w-8 md:h-8" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart size={80} className="text-gray-300 mb-6" />
                <p className="text-gray-500 text-2xl font-semibold mb-4">
                  Seu carrinho está vazio
                </p>
                <p className="text-gray-400 text-lg">
                  Adicione serviços para começar
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.serviceId}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all animate-fade-in-up"
                  >
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-black text-base leading-snug">
                          {item.serviceName}
                        </p>
                        <p className="text-green-600 font-bold text-lg mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.serviceId)}
                        className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors shrink-0"
                        title="Remover do carrinho"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.serviceId, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-sm transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-bold text-black text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.serviceId, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Subtotal:{" "}
                        <span className="font-bold text-black">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Summary */}
          {cartItems.length > 0 && (
            <div className="bg-gray-50 border-t border-gray-200 p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="max-w-4xl mx-auto">
                {/* Summary Box */}
                <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex justify-between text-sm md:text-lg">
                    <span className="text-gray-600">Quantidade de itens:</span>
                    <span className="font-bold text-black">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-lg">
                    <span className="text-gray-600">Total de serviços:</span>
                    <span className="font-bold text-black">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 md:pt-3 flex justify-between items-center">
                    <span className="text-gray-600 font-bold text-sm md:text-lg">Total:</span>
                    <span className="text-2xl md:text-4xl font-bold text-green-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 md:py-4 text-xs md:text-lg font-semibold flex items-center justify-center gap-1 md:gap-2 transition-colors whitespace-nowrap"
                  >
                    <ArrowLeft size={16} className="md:w-5 md:h-5" />
                    <span className="hidden md:inline">Continuar Comprando</span>
                    <span className="md:hidden">Voltar</span>
                  </Button>
                  <Button
                    onClick={() => setShowConfirmation(true)}
                    className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-2 md:py-4 text-xs md:text-lg font-semibold flex items-center justify-between gap-1 md:gap-2 transition-colors whitespace-nowrap"
                  >
                    <span className="hidden md:inline">Finalizar Pedido</span>
                    <span className="md:hidden">Finalizar</span>
                    <WhatsAppIcon className="w-3 h-3 md:w-5 md:h-5 shrink-0" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-6">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-black mb-2">
                Confirmar Pedido
              </h2>
              <p className="text-gray-600 text-sm">
                Revise seu pedido antes de enviar para WhatsApp
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.serviceId} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-semibold text-black text-sm">
                      {item.serviceName}
                    </p>
                    <p className="text-gray-600 text-xs">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-xs">
                      R$ {item.price.toFixed(2)} cada
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-4 mb-6 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Valor Total:</span>
                <span className="text-4xl font-bold text-green-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 font-semibold flex items-center justify-between gap-2 transition-colors"
              >
                <span>Enviar para WhatsApp</span>
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
              </Button>
              <Button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 font-semibold transition-colors"
              >
                Voltar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
