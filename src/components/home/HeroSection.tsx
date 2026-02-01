import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dubai.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury buses with Dubai skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-secondary-foreground text-sm font-inter">Premium Transport Services in UAE</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-secondary-foreground mb-6 leading-tight">
            Experience Luxury
            <span className="block text-primary">On Every Journey</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto font-inter">
            Premium buses, corporate transfers, and VIP transportation services across Dubai. Travel in style with professional chauffeurs and immaculate vehicles.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold text-lg px-8 py-6 hover-lift"
            >
              <Link to="/contact">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-inter font-semibold text-lg px-8 py-6 transition-smooth"
            >
              <Link to="/fleet">View Our Fleet</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-secondary-foreground/80">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <span className="text-sm font-inter">500+ Happy Clients</span>
            </div>
            <div className="h-4 w-px bg-secondary-foreground/30"></div>
            <div className="text-sm font-inter">24/7 Service</div>
            <div className="h-4 w-px bg-secondary-foreground/30"></div>
            <div className="text-sm font-inter">Professional Chauffeurs</div>
            <div className="h-4 w-px bg-secondary-foreground/30"></div>
            <div className="text-sm font-inter">Premium Fleet</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
