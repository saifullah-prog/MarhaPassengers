import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al Mansoori",
    role: "CEO, Emirates Tech Solutions",
    content:
      "Outstanding service! Marha Passengers Transport LLC has been our trusted partner for corporate events and daily staff transportation. Always punctual, professional, and reliable.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Event Manager",
    content:
      "We used their services for our company's annual conference. The fleet was immaculate, drivers were courteous, and everything ran like clockwork. Highly recommended!",
    rating: 5,
  },
  {
    name: "Mohammed Hassan",
    role: "Tourist from Saudi Arabia",
    content:
      "Explored Dubai with their luxury bus service. The comfort level was exceptional, and our driver was knowledgeable about all the best spots. Worth every dirham!",
    rating: 5,
  },
];

const Testimonials = () => {
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 shadow-card hover-lift bg-card relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              <div>
                <p className="font-playfair font-bold text-foreground text-lg">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground font-inter">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
