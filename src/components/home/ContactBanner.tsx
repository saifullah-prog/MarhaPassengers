import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactBanner = () => {
  return (
    <section className="py-20 bg-gradient-luxury">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-secondary-foreground mb-6">
            Ready to Experience
            <span className="block text-primary">Luxury Transportation?</span>
          </h2>
          <p className="text-lg text-secondary-foreground/80 mb-8 font-inter">
            Book your premium transport today and travel in unmatched comfort and style across UAE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold text-lg px-8 py-6 hover-lift"
            >
              <Link to="/contact">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-inter font-semibold text-lg px-8 py-6 transition-smooth"
            >
              <a href="tel:+971553285084">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-secondary-foreground/70">
            <a
              href="tel:+971553285084"
              className="flex items-center space-x-2 hover:text-primary transition-smooth"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-inter">+971 55 3285084</span>
            </a>
            <div className="h-4 w-px bg-secondary-foreground/30"></div>
            <a
              href="mailto:marhapassengertransport@gmail.com"
              className="flex items-center space-x-2 hover:text-primary transition-smooth"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm font-inter">marhapassengertransport@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
