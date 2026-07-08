import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ReviewFormProps {
  serviceId: string;
  onSubmit: (data: {
    rating: number;
    comment: string;
    author: string;
    email: string;
  }) => void;
}

export function ReviewForm({ serviceId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment || !author || !email) return;

    onSubmit({ rating, comment, author, email });

    setRating(0);
    setComment("");
    setAuthor("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-lg border border-gray-200"
      data-service-id={serviceId}
    >
      <h4 className="text-lg font-bold text-black mb-4 font-serif">
        Deixe sua avaliação
      </h4>

      <div className="mb-4">
        <Label className="mb-2 block">Nota</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star
                size={28}
                className={
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor={`author-${serviceId}`} className="mb-2 block">
          Nome
        </Label>
        <Input
          id={`author-${serviceId}`}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor={`email-${serviceId}`} className="mb-2 block">
          E-mail
        </Label>
        <Input
          id={`email-${serviceId}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="mb-6">
        <Label htmlFor={`comment-${serviceId}`} className="mb-2 block">
          Comentário
        </Label>
        <Textarea
          id={`comment-${serviceId}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte sua experiência com este serviço"
          rows={4}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
      >
        Enviar avaliação
      </Button>
    </form>
  );
}
