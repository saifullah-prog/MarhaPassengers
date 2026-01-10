import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, Building2, MapPin, Users, Heart, Shield, Clock, Star, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Professional airport pickup and drop-off services with flight tracking and complimentary meet & greet.",
    features: [
      "24/7 availability",
      "Flight tracking",
      "Meet & greet service",
      "Luggage assistance",
      "All UAE airports covered",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Transport",
    description: "Reliable daily commute solutions for corporate clients with dedicated vehicles and flexible contracts.",
    features: [
      "Dedicated vehicles",
      "Flexible scheduling",
      "Professional drivers",
      "Monthly packages",
      "Priority support",
    ],
  },
  {
    icon: MapPin,
    title: "City Tours",
    description: "Explore Dubai's iconic landmarks in comfort with our guided luxury tours and customizable itineraries.",
    features: [
      "Knowledgeable guides",
      "Custom itineraries",
      "All major attractions",
      "Group discounts",
      "Refreshments included",
    ],
  },
  {
    icon: Users,
    title: "Staff Shuttle",
    description: "Efficient employee transportation services tailored to your company's schedule and requirements.",
    features: [
      "Multiple pickup points",
      "Scheduled routes",
      "Real-time tracking",
      "Cost-effective",
      "Reliable service",
    ],
  },
  {
    icon: Heart,
    title: "Events & Weddings",
    description: "Make your special occasions memorable with our premium event transportation and coordination.",
    features: [
      "Wedding packages",
      "Event coordination",
      "Decorated vehicles",
      "Professional chauffeurs",
      "Photography support",
    ],
  },
  {
    icon: Shield,
    title: "VIP Services",
    description: "Exclusive transportation with enhanced privacy, security, and personalized service for VIP clients.",
    features: [
      "Executive vehicles",
      "Enhanced privacy",
      "Personal chauffeur",
      "Flexible scheduling",
      "Concierge service",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-luxury py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-secondary-foreground mb-6">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 font-inter">
                Comprehensive luxury transportation solutions designed to meet every need with professionalism and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card
                  key={service.title}
                  className="p-8 shadow-card hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-gold rounded-lg flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-playfair font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-inter mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center space-x-2 text-sm text-muted-foreground font-inter">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        asChild
                        className="border-primary text-primary hover:bg-primary hover:text-white transition-smooth font-inter font-semibold"
                      >
                        <Link to="/contact">
                          Get Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
                  Why Choose Our <span className="text-primary">Services</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Clock,
                    title: "Punctuality Guaranteed",
                    description: "We understand the value of your time and ensure timely service for every booking.",
                  },
                  {
                    icon: Shield,
                    title: "Fully Insured Fleet",
                    description: "All our vehicles are comprehensively insured for your complete peace of mind.",
                  },
                  {
                    icon: Star,
                    title: "Premium Quality",
                    description: "Meticulously maintained vehicles and highly trained professional chauffeurs.",
                  },
                  {
                    icon: Users,
                    title: "Customer Focused",
                    description: "Dedicated support team available to assist you throughout your journey.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start space-x-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-luxury">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold text-secondary-foreground mb-6">
                Ready to Book Your <span className="text-primary">Service?</span>
              </h2>
              <p className="text-lg text-secondary-foreground/80 mb-8 font-inter">
                Contact us today for a customized quote and experience the Marha Passengers Transport LLC difference.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold text-lg px-8 py-6 hover-lift"
              >
                <Link to="/contact">
                  Contact Us Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
