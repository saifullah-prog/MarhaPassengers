import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    pickup: "",
    dropoff: "",
    vehicleType: "",
    passengers: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save booking to Supabase
      const { error: bookingError } = await supabase.from('bookings').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pickup_date: formData.date,
          pickup_location: formData.pickup,
          dropoff_location: formData.dropoff,
          vehicle_type: formData.vehicleType,
          passengers: parseInt(formData.passengers.split('-')[0]) || 1,
          message: formData.message,
          status: 'pending',
        },
      ]);

      if (bookingError) throw bookingError;

      // Also save as inquiry
      const { error: inquiryError } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Booking request: ${formData.vehicleType} for ${formData.passengers} passengers from ${formData.pickup} to ${formData.dropoff} on ${formData.date}. ${formData.message}`,
          status: 'new',
        },
      ]);

      if (inquiryError) throw inquiryError;

      toast.success("Your inquiry has been submitted! We'll contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        pickup: "",
        dropoff: "",
        vehicleType: "",
        passengers: "",
        message: "",
      });
    } catch (error: any) {
      toast.error("Failed to submit inquiry. Please try again or contact us directly.");
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'd like to inquire about your luxury transport services.");
    window.open(`https://wa.me/971500000000?text=${message}`, "_blank");
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
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 font-inter">
                Get in touch with us for bookings, inquiries, or any assistance you need.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+971 55 3285084",
                  link: "tel:+971553285084",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "marhapassengertransport@gmail.com",
                  link: "mailto:marhapassengertransport@gmail.com",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "Dubai Marina, Dubai, UAE",
                  link: "#",
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  content: "24/7 Available",
                  link: "#",
                },
              ].map((item, index) => (
                <Card
                  key={item.title}
                  className="p-6 text-center shadow-luxury hover-lift bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-gold rounded-full mb-4">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  {item.link === "#" ? (
                    <p className="text-sm text-muted-foreground font-inter">{item.content}</p>
                  ) : (
                    <a
                      href={item.link}
                      className="text-sm text-primary hover:text-primary/80 transition-smooth font-inter"
                    >
                      {item.content}
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="animate-fade-in">
                <h2 className="text-4xl font-playfair font-bold text-foreground mb-6">
                  Book Your <span className="text-primary">Ride</span>
                </h2>
                <p className="text-muted-foreground font-inter mb-8 leading-relaxed">
                  Fill out the form below and our team will get back to you with a customized quote within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-inter">Full Name *</Label>
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
                    <div>
                      <Label htmlFor="phone" className="font-inter">Phone *</Label>
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
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-inter">Email Address *</Label>
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

                  <div>
                    <Label htmlFor="date" className="font-inter">Travel Date *</Label>
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
                      <Label htmlFor="pickup" className="font-inter">Pickup Location *</Label>
                      <Input
                        id="pickup"
                        name="pickup"
                        value={formData.pickup}
                        onChange={handleChange}
                        required
                        placeholder="Dubai Marina"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dropoff" className="font-inter">Drop-off Location *</Label>
                      <Input
                        id="dropoff"
                        name="dropoff"
                        value={formData.dropoff}
                        onChange={handleChange}
                        required
                        placeholder="Dubai Mall"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vehicleType" className="font-inter">Vehicle Type *</Label>
                      <Select 
                        value={formData.vehicleType}
                        onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                        required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Luxury Coach Bus">Luxury Coach Bus</SelectItem>
                          <SelectItem value="Premium Van">Premium Van</SelectItem>
                          <SelectItem value="Luxury SUV">Luxury SUV</SelectItem>
                          <SelectItem value="Executive Sedan">Executive Sedan</SelectItem>
                          <SelectItem value="Mini Bus">Mini Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="passengers" className="font-inter">Passengers *</Label>
                      <Select 
                        value={formData.passengers}
                        onValueChange={(value) => setFormData({ ...formData, passengers: value })}
                        required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 passengers</SelectItem>
                          <SelectItem value="6-10">6-10 passengers</SelectItem>
                          <SelectItem value="11-20">11-20 passengers</SelectItem>
                          <SelectItem value="21-40">21-40 passengers</SelectItem>
                          <SelectItem value="40+">40+ passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-inter">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requirements or questions..."
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
                      "Submit Inquiry"
                    )}
                  </Button>
                </form>
              </div>

              {/* WhatsApp & Additional Info */}
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Card className="p-8 shadow-luxury mb-8">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                    Quick <span className="text-primary">Contact</span>
                  </h3>
                  <p className="text-muted-foreground font-inter mb-6 leading-relaxed">
                    Need immediate assistance? Contact us directly via WhatsApp for instant support.
                  </p>
                  <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-inter font-semibold text-lg py-6"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </Button>
                </Card>

                <Card className="p-8 shadow-luxury">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                    What to <span className="text-primary">Expect</span>
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Response within 24 hours",
                      "Competitive pricing with no hidden fees",
                      "Customized quote based on your needs",
                      "Flexible booking options",
                      "Professional consultation",
                    ].map((item) => (
                      <li key={item} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-gold rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-muted-foreground font-inter text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
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

export default Contact;
