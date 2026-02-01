import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-luxury py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-secondary-foreground mb-6">
                Terms & <span className="text-primary">Conditions</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 font-inter">
                Last updated: November 22, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-8 text-muted-foreground font-inter leading-relaxed">
                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">1. Introduction</h2>
                    <p>
                      Welcome to Marha Passengers Transportation LLC. These Terms and Conditions govern your use of our services and website. By booking or using our transportation services, you agree to be bound by these terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">2. Booking and Reservations</h2>
                    <p className="mb-3">
                      All bookings are subject to availability and confirmation. We reserve the right to decline any booking request at our discretion.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Bookings must be made at least 24 hours in advance for regular services</li>
                      <li>Last-minute bookings are subject to availability and may incur additional charges</li>
                      <li>All booking details must be accurate and complete</li>
                      <li>Changes to bookings must be made at least 12 hours before scheduled pickup</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">3. Payment Terms</h2>
                    <p className="mb-3">
                      Payment for services must be made according to the agreed terms:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Full payment or deposit may be required at the time of booking</li>
                      <li>We accept cash, credit cards, and bank transfers</li>
                      <li>Corporate clients may be eligible for monthly invoicing</li>
                      <li>All prices are in UAE Dirhams unless otherwise specified</li>
                      <li>Prices include VAT where applicable</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">4. Cancellation Policy</h2>
                    <p className="mb-3">
                      Our cancellation policy is as follows:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Cancellations made 48+ hours before pickup: Full refund</li>
                      <li>Cancellations made 24-48 hours before pickup: 50% refund</li>
                      <li>Cancellations made less than 24 hours before pickup: No refund</li>
                      <li>No-shows will be charged the full amount</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">5. Passenger Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Passengers must be at the pickup location at the scheduled time</li>
                      <li>Smoking is strictly prohibited in all vehicles</li>
                      <li>Passengers are responsible for any damage to vehicles caused by their actions</li>
                      <li>Food and drinks may be restricted in certain vehicles</li>
                      <li>Passengers must comply with all UAE traffic laws and regulations</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">6. Liability and Insurance</h2>
                    <p className="mb-3">
                      Marha Passengers Transportation LLC maintains comprehensive insurance coverage for all vehicles and passengers. However:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We are not liable for delays caused by traffic, weather, or circumstances beyond our control</li>
                      <li>Personal belongings left in vehicles are not our responsibility</li>
                      <li>We recommend passengers maintain their own travel insurance</li>
                      <li>Claims for damage or loss must be reported within 24 hours</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">7. Service Standards</h2>
                    <p>
                      We are committed to providing exceptional service. Our drivers are professionally trained, licensed, and vetted. All vehicles are regularly maintained and inspected to ensure safety and comfort.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">8. Modifications to Terms</h2>
                    <p>
                      We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">9. Governing Law</h2>
                    <p>
                      These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of UAE.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">10. Contact Information</h2>
                    <p>
                      For questions about these terms, please contact us at:
                    </p>
                    <p className="mt-3">
                      Email: marhapassengertransport@gmail.com<br />
                      Phone: +971 55 3285084<br />
                      Address: United Arab Emirates
                    </p>
                  </div>
                </div>
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

export default Terms;
