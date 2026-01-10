import { Card } from "@/components/ui/card";
import { Plane, Building2, MapPin, Users, Heart, Shield } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Punctual and professional airport pickup and drop-off services with flight tracking.",
  },
  {
    icon: Building2,
    title: "Corporate Transport",
    description: "Reliable daily commute solutions for corporate clients with dedicated vehicles.",
  },
  {
    icon: MapPin,
    title: "City Tours",
    description: "Explore Dubai's iconic landmarks in comfort with our guided luxury tours.",
  },
  {
    icon: Users,
    title: "Staff Shuttle",
    description: "Efficient employee transportation services tailored to your company's schedule.",
  },
  {
    icon: Heart,
    title: "Events & Weddings",
    description: "Make your special occasions memorable with our premium event transportation.",
  },
  {
    icon: Shield,
    title: "VIP Services",
    description: "Exclusive transportation with enhanced privacy and personalized service.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Premium <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            Comprehensive transportation solutions designed to meet your every need with luxury and professionalism.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="p-6 shadow-card hover-lift cursor-pointer group bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-gold rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-2 group-hover:text-primary transition-smooth">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
