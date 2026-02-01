import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Marha Passengers Transportation LLC" 
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-primary font-playfair font-bold text-lg leading-tight">
                  Marha Passengers
                </span>
                <span className="text-secondary-foreground text-xs uppercase tracking-wider">
                  Transportation LLC
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Premier luxury transport services in UAE, offering premium vehicles and professional chauffeurs for all your transportation needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-playfair font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Fleet", "Services", "Reviews", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary font-playfair font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Airport Transfer",
                "Corporate Transport",
                "City Tours",
                "Staff Shuttle",
                "Events & Weddings",
                "VIP Services",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary font-playfair font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-white mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  United Arab Emirates
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white" />
                <a href="tel:+971553285084" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  +971 55 3285084
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white" />
                <a href="mailto:marhapassengertransport@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  marhapassengertransport@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Marha Passengers Transportation LLC. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
