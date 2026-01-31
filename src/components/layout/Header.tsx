import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Fleet", path: "/fleet" },
    { name: "Services", path: "/services" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  const isSolid = isScrolled || isMobileMenuOpen || !isHome;
  const textColor = isSolid ? "text-secondary" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isSolid ? "bg-white shadow-luxury" : "bg-white/10 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Marha Passengers Transportation LLC" 
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-primary font-playfair font-bold text-lg leading-tight">
                Marha Passengers
              </span>
              <span className={`${textColor} text-xs uppercase tracking-wider transition-smooth`}>
                Transportation LLC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${textColor} hover:text-primary transition-smooth font-inter font-medium`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+971553285084" className={`flex items-center space-x-2 ${textColor} hover:text-primary transition-smooth`}>
              <Phone className="h-4 w-4" />
              <span className="font-inter font-medium">+971 55 3285084</span>
            </a>
            <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold">
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${textColor} hover:text-primary transition-smooth`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-secondary hover:text-primary transition-smooth font-inter font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+971553285084" className="flex items-center space-x-2 text-secondary hover:text-primary transition-smooth py-2">
                <Phone className="h-4 w-4" />
                <span className="font-inter font-medium">+971 55 3285084</span>
              </a>
              <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold">
                <Link to="/contact">Book Now</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
