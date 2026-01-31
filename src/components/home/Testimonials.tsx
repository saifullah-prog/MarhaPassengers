import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ReviewCard from "@/components/reviews/ReviewCard";

interface Review {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, message, rating, created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (!error) {
        setReviews(data || []);
      }
      setLoading(false);
    };

    loadReviews();
  }, []);

  const marqueeItems = reviews.length > 0 ? [...reviews, ...reviews] : [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            Don't just take our word for it. Here's what our valued clients have to say about their experiences.
          </p>
        </div>

        {/* Testimonials Marquee */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`loading-${index}`}
                className="p-6 shadow-card bg-card relative animate-pulse"
              >
                <div className="h-5 w-28 bg-muted rounded mb-4" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-11/12 bg-muted rounded mb-2" />
                <div className="h-4 w-9/12 bg-muted rounded mb-6" />
                <div className="h-5 w-32 bg-muted rounded" />
              </Card>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <Card className="p-6 shadow-card bg-card text-center">
            <p className="text-muted-foreground font-inter">
              No reviews yet. Be the first to share your experience.
            </p>
          </Card>
        ) : (
          <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
            <div className="relative overflow-x-hidden overflow-y-visible py-8 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
                {marqueeItems.map((review, index) => (
                  <ReviewCard
                    key={`${review.id}-${index}`}
                    name={review.name}
                    message={review.message}
                    rating={review.rating}
                    className="h-full w-[320px] md:w-[360px] lg:w-[380px] shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
