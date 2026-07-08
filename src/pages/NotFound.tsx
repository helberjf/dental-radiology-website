import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <p className="text-green-600 text-sm font-semibold mb-3 uppercase tracking-widest">
        Erro 404
      </p>
      <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 font-serif">
        Página não encontrada
      </h1>
      <p className="text-gray-600 text-lg mb-10 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/">
        <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-semibold">
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
}
