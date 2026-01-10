import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, TrendingUp, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Award, label: "Years Experience", value: "10+" },
    { icon: TrendingUp, label: "Completed Trips", value: "5000+" },
    { icon: Shield, label: "Safety Rating", value: "100%" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-luxury py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-secondary-foreground mb-6">
                About <span className="text-primary">Marha Passengers Transportation LLC</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 font-inter">
                Setting the standard for premium transportation services in Dubai since 2014.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-playfair font-bold text-foreground mb-6">
                  Our <span className="text-primary">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground font-inter leading-relaxed">
                  <p>
                    Marha Passengers Transportation LLC was founded with a simple vision: to provide the finest transportation experience in the UAE. What started as a small fleet of premium vehicles has grown into one of Dubai's most trusted transport companies.
                  </p>
                  <p>
                    We understand that transportation is more than just getting from point A to point B. It's about the experience, the comfort, and the peace of mind that comes with knowing you're in capable hands.
                  </p>
                  <p>
                    Today, we serve corporate clients, tourists, and residents across Dubai and the UAE, maintaining our commitment to excellence in every journey we undertake.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-card p-6 rounded-lg shadow-card text-center hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-4">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-playfair font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-inter">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-card animate-fade-in">
                <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Our <span className="text-primary">Mission</span>
                </h3>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  To deliver exceptional luxury transportation services that exceed expectations, ensuring every journey is comfortable, safe, and memorable. We strive to be the first choice for discerning clients who value quality, reliability, and professionalism.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Our <span className="text-primary">Vision</span>
                </h3>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  To become the leading luxury transport provider in the UAE, recognized for our unwavering commitment to excellence, innovation, and customer satisfaction. We aim to set new standards in the industry through continuous improvement and dedication to our craft.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                Our Core <span className="text-primary">Values</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "We pursue excellence in every aspect of our service, from vehicle maintenance to customer care.",
                },
                {
                  title: "Reliability",
                  description: "Our clients trust us to be punctual, consistent, and dependable in all situations.",
                },
                {
                  title: "Integrity",
                  description: "We conduct business with honesty, transparency, and respect for all stakeholders.",
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="text-center p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-2xl font-playfair font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground font-inter leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
