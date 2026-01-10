import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-luxury py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-secondary-foreground mb-6">
                Privacy <span className="text-primary">Policy</span>
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
                      Marha Passengers Transport LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">2. Information We Collect</h2>
                    <p className="mb-3">
                      We collect several types of information to provide and improve our services:
                    </p>
                    <h3 className="text-xl font-playfair font-semibold text-foreground mb-2 mt-4">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Name, email address, and phone number</li>
                      <li>Pickup and drop-off locations</li>
                      <li>Payment information</li>
                      <li>Booking history and preferences</li>
                    </ul>
                    <h3 className="text-xl font-playfair font-semibold text-foreground mb-2 mt-4">Automatically Collected Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>IP address and browser type</li>
                      <li>Device information</li>
                      <li>Website usage data</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                    <p className="mb-3">
                      We use the collected information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To process and fulfill your booking requests</li>
                      <li>To communicate with you about your bookings</li>
                      <li>To improve our services and customer experience</li>
                      <li>To send promotional materials (with your consent)</li>
                      <li>To comply with legal obligations</li>
                      <li>To prevent fraud and ensure security</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
                    <p className="mb-3">
                      We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Our drivers and staff to fulfill your booking</li>
                      <li>Payment processors to handle transactions</li>
                      <li>Service providers who assist our operations</li>
                      <li>Law enforcement when required by law</li>
                      <li>Business partners with your explicit consent</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">5. Data Security</h2>
                    <p>
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">6. Data Retention</h2>
                    <p>
                      We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Booking records are typically retained for 7 years for accounting and legal purposes.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">7. Your Rights</h2>
                    <p className="mb-3">
                      Under applicable data protection laws, you have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your information</li>
                      <li>Object to processing of your information</li>
                      <li>Request data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">8. Cookies and Tracking</h2>
                    <p>
                      Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences. Note that disabling cookies may affect website functionality.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">9. Third-Party Links</h2>
                    <p>
                      Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">10. Children's Privacy</h2>
                    <p>
                      Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">11. Changes to This Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last updated" date.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">12. Contact Us</h2>
                    <p>
                      If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                    </p>
                    <p className="mt-3">
                      Email: marhapassengertransport@gmail.com<br />
                      Phone: +971 55 3285084<br />
                      Address: Dubai Marina, Dubai, UAE
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

export default Privacy;
