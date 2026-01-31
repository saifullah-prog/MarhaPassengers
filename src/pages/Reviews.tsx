import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import ReviewCard from "@/components/reviews/ReviewCard";

interface Review {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

const Reviews = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "5",
  });
  const [submitting, setSubmitting] = useState(false);
  const maxMessageLength = 150;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > maxMessageLength) {
      toast.error(`Review must be ${maxMessageLength} characters or less.`);
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          rating: parseInt(formData.rating, 10),
          status: "inactive",
        },
      ]);

      if (error) throw error;

      toast.success("Thanks for your review! We'll publish it after approval.");
      setFormData({ name: "", email: "", message: "", rating: "5" });
      const { data } = await supabase
        .from("reviews")
        .select("id, name, message, rating, created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      setReviews(data || []);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Review submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-luxury py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-secondary-foreground mb-6">
                Leave a <span className="text-primary">Review</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 font-inter">
                Share your experience with Marha Passengers Transportation LLC.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8 shadow-luxury">
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Your <span className="text-primary">Feedback</span>
                </h2>
                <p className="text-muted-foreground font-inter mb-8">
                  Your review helps us improve and helps others choose confidently.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-inter">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-inter">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message" className="font-inter">Your Review *</Label>
                      <span className="text-xs text-muted-foreground font-inter">
                        {formData.message.length}/{maxMessageLength}
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your experience..."
                      rows={5}
                      maxLength={maxMessageLength}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating" className="font-inter">Star Rating *</Label>
                    <Select
                      value={formData.rating}
                      onValueChange={(value) => setFormData({ ...formData, rating: value })}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">★★★★★ (5)</SelectItem>
                        <SelectItem value="4">★★★★☆ (4)</SelectItem>
                        <SelectItem value="3">★★★☆☆ (3)</SelectItem>
                        <SelectItem value="2">★★☆☆☆ (2)</SelectItem>
                        <SelectItem value="1">★☆☆☆☆ (1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-inter font-semibold text-lg py-6 hover-lift"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-playfair font-bold text-foreground mb-3">
                What Our <span className="text-primary">Clients Say</span>
              </h2>
              <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
                Real feedback from customers who trusted us with their journeys.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={`review-loading-${index}`} className="p-6 shadow-card bg-card animate-pulse">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    name={review.name}
                    message={review.message}
                    rating={review.rating}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Reviews;
