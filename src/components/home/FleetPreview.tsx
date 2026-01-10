import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Luggage, Star, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  image_url: string;
  seats: number;
  features: string[];
  description: string;
}

const FleetPreview = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (fetchError) throw fetchError;

      setVehicles(data || []);
    } catch (err: any) {
      console.error('Error loading vehicles:', err);
      setError(err.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Our Premium <span className="text-primary">Fleet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            Choose from our diverse range of luxury vehicles, each meticulously maintained and equipped with premium amenities.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Failed to Load Vehicles</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={loadVehicles} variant="outline">
              <ArrowRight className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        {/* Vehicle Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {vehicles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No vehicles available at the moment.</p>
                  <p className="text-sm text-muted-foreground mt-2">Please check back later.</p>
                </div>
              ) : (
                vehicles.map((vehicle, index) => (
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
                      <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                        {vehicle.name}
                      </h3>

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
                        {vehicle.features.slice(0, 3).map((feature) => (
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
                ))
              )}
            </div>

            {/* View All Button */}
            {vehicles.length > 0 && (
              <div className="text-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold hover-lift"
                >
                  <Link to="/fleet">
                    View All Vehicles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FleetPreview;
