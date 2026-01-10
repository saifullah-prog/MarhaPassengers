import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FleetPreview from "@/components/home/FleetPreview";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import ContactBanner from "@/components/home/ContactBanner";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FleetPreview />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
        <ContactBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
