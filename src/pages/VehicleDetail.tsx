import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Luggage, Star, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  image_url: string;
  seats: number;
  features: string[];
  description: string;
}

interface Pricing {
  id: string;
  city_area: string;
  price_4h: number;
  price_8h: number;
  price_full_day: number;
  price_weekly: number;
  price_monthly: number;
}

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    pickup: "",
    dropoff: "",
    passengers: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      loadVehicleDetails();
    }
  }, [id]);

  const loadVehicleDetails = async () => {
    try {
      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (vehicleError) throw vehicleError;
      setVehicle(vehicleData);

      const { data: pricingData, error: pricingError } = await supabase
        .from('pricing')
        .select('*')
        .eq('vehicle_id', id);

      if (pricingError) throw pricingError;
      setPricing(pricingData || []);
    } catch (error) {
      console.error('Error loading vehicle details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('bookings').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pickup_date: formData.date,
          pickup_location: formData.pickup,
          dropoff_location: formData.dropoff,
          vehicle_type: vehicle?.name || '',
          passengers: parseInt(formData.passengers) || 1,
          message: formData.message,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      toast.success("Quote request submitted! We'll contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        pickup: "",
        dropoff: "",
        passengers: "",
        message: "",
      });
    } catch (error: any) {
      toast.error("Failed to submit quote request. Please try again.");
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-playfair font-bold mb-4">Vehicle Not Found</h1>
          <Button asChild>
            <Link to="/fleet">Back to Fleet</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="bg-muted py-4">
          <div className="container mx-auto px-4">
            <Link to="/fleet" className="flex items-center text-primary hover:text-primary/80 transition-smooth font-inter">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Link>
          </div>
        </section>

        {/* Vehicle Details */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image and Basic Info */}
              <div className="animate-fade-in">
                <div className="relative rounded-lg overflow-hidden shadow-luxury mb-6">
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-1">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                    <span className="text-lg font-inter font-semibold text-secondary-foreground">
                      5.0
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
                  {vehicle.name}
                </h1>
                <p className="text-muted-foreground font-inter mb-8 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Pricing Table */}
                <div className="mb-8">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Rental Rates</h3>
                  {pricing.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-border shadow-card">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-secondary text-secondary-foreground">
                            <th className="py-3 px-4 text-left font-inter font-semibold text-sm">City/Area</th>
                            <th className="py-3 px-4 text-left font-inter font-semibold text-sm">4 Hours</th>
                            <th className="py-3 px-4 text-left font-inter font-semibold text-sm">8 Hours</th>
                            <th className="py-3 px-4 text-left font-inter font-semibold text-sm">Full Day</th>
                            <th className="py-3 px-4 text-left font-inter font-semibold text-sm">Weekly</th>
                            <th className="py-3 px-4 text-left font-inter font-semibold text-sm">Monthly</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pricing.map((price, index) => (
                            <tr 
                              key={price.id} 
                              className={index % 2 === 0 ? "bg-background hover:bg-muted/30 transition-smooth" : "bg-muted/20 hover:bg-muted/40 transition-smooth"}
                            >
                              <td className="py-3 px-4 font-inter text-sm border-b border-border">{price.city_area}</td>
                              <td className="py-3 px-4 font-inter text-sm border-b border-border">AED {price.price_4h.toLocaleString()}</td>
                              <td className="py-3 px-4 font-inter text-sm border-b border-border">AED {price.price_8h.toLocaleString()}</td>
                              <td className="py-3 px-4 font-inter text-sm border-b border-border">AED {price.price_full_day.toLocaleString()}</td>
                              <td className="py-3 px-4 font-inter text-sm border-b border-border">AED {price.price_weekly.toLocaleString()}</td>
                              <td className="py-3 px-4 font-inter text-sm border-b border-border">AED {price.price_monthly.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-sm text-muted-foreground font-inter mt-3 px-4 pb-4 italic">
                        * Prices are indicative and may vary based on season and availability. Contact us for exact quotes.
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground font-inter">Pricing information available upon request. Contact us for details.</p>
                  )}
                </div>

                <div className="flex items-center space-x-8 mb-8">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-inter font-medium">{vehicle.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Luggage className="h-5 w-5 text-primary" />
                    <span className="font-inter font-medium">{vehicle.type}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Card className="p-8 shadow-luxury sticky top-24">
                  <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                    Request a <span className="text-primary">Quote</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-inter">Full Name</Label>
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="font-inter">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+971 55 3285084"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-inter">Email</Label>
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
                    </div>

                    <div>
                      <Label htmlFor="date" className="font-inter">Travel Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickup" className="font-inter">Pickup Location</Label>
                        <Input
                          id="pickup"
                          name="pickup"
                          value={formData.pickup}
                          onChange={handleChange}
                          required
                          placeholder="UAE Marina"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dropoff" className="font-inter">Drop-off Location</Label>
                        <Input
                          id="dropoff"
                          name="dropoff"
                          value={formData.dropoff}
                          onChange={handleChange}
                          required
                          placeholder="UAE Mall"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="passengers" className="font-inter">Number of Passengers</Label>
                      <Select name="passengers" required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 passengers</SelectItem>
                          <SelectItem value="6-10">6-10 passengers</SelectItem>
                          <SelectItem value="11-20">11-20 passengers</SelectItem>
                          <SelectItem value="21+">21+ passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-inter">Additional Notes</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any special requirements..."
                        rows={4}
                        className="mt-1"
                      />
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
                        "Request Quote"
                      )}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default VehicleDetail;
