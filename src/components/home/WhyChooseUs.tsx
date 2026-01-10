import { Shield, Clock, Star, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fully Licensed & Insured",
    description: "All vehicles are properly licensed and comprehensively insured for your peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock service to meet your transportation needs at any time.",
  },
  {
    icon: Star,
    title: "Professional Chauffeurs",
    description: "Experienced, courteous drivers trained to provide exceptional service.",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    description: "Dedicated support team ready to assist you before, during, and after your journey.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto font-inter">
            We're committed to delivering excellence in every aspect of our service, ensuring your comfort and satisfaction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold rounded-full mb-4 group-hover:scale-110 transition-smooth shadow-luxury">
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2 group-hover:text-primary transition-smooth">
                {feature.title}
              </h3>
              <p className="text-secondary-foreground/70 font-inter text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
