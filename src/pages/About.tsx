import { Users, Award, Globe, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "We serve travelers to over 100 countries worldwide"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our experienced travel consultants ensure the best experiences"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized as the best travel agency for 5 consecutive years"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction and memorable experiences are our top priority"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-24 pb-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                About TravelWise
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We are passionate about creating unforgettable travel experiences
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-muted-foreground mb-4">
                  TravelWise was founded with a simple mission: to make world travel accessible, 
                  enjoyable, and truly memorable for everyone. Our team of travel experts has 
                  explored corners of the world and understands what makes a journey unforgettable.
                </p>
                <p className="text-muted-foreground mb-4">
                  We believe that travel is more than just visiting places – it's about experiencing 
                  new cultures, meeting people, and creating stories that last a lifetime. Every 
                  destination we recommend, every itinerary we create, is designed to give you more 
                  than just a vacation – it's an adventure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

