import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Luggage, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  image_url: string;
  seats: number;
  features: string[];
  description: string;
}

const Fleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-luxury py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-secondary-foreground mb-6">
                Our Premium <span className="text-primary">Fleet</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 font-inter">
                Explore our diverse collection of luxury vehicles, each maintained to the highest standards and equipped with premium amenities.
              </p>
            </div>
          </div>
        </section>

        {/* Fleet Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading fleet...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No vehicles available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map((vehicle, index) => (
                <Card
                  key={vehicle.id}
                  className="overflow-hidden shadow-card hover-lift cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="relative overflow-hidden">
                      <img
                        src={vehicle.image_url}
                        alt={vehicle.name}
                        className="w-full h-64 object-cover transition-smooth group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span className="text-sm font-inter font-semibold text-secondary-foreground">
                          5.0
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 font-inter">
                        {vehicle.description}
                      </p>

                      <div className="flex items-center justify-between mb-4 text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm font-inter">{vehicle.seats} Seats</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Luggage className="h-4 w-4 text-primary" />
                          <span className="text-sm font-inter">{vehicle.type}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-inter"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-smooth font-inter font-semibold"
                      >
                        <Link to={`/fleet/${vehicle.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold text-foreground mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 font-inter">
                Contact us for custom transportation solutions tailored to your specific needs.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold hover-lift"
              >
                <Link to="/contact">
                  Contact Us
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

export default Fleet;
