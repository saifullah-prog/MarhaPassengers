import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  message: string;
  rating: number;
  className?: string;
}

const ReviewCard = ({ name, message, rating, className }: ReviewCardProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      className={`p-7 shadow-card hover-lift bg-card relative border border-primary/10 min-h-[280px] flex flex-col overflow-hidden ${className || ""}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center space-x-1 rounded-full bg-primary/5 px-3 py-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 text-primary fill-primary" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground font-inter">{rating}.0</span>
      </div>

      <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6 review-clamp min-h-[96px]">
        "{message}"
      </p>

      <div className="pt-4 border-t border-border/60 mt-auto flex items-center justify-between">
        <p className="font-playfair font-bold text-foreground text-lg">{name}</p>
        <div className="h-9 w-9 rounded-full bg-gradient-gold text-white text-xs font-semibold flex items-center justify-center">
          {initials}
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
