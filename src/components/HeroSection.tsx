import { useState, useEffect } from "react";
import { Search, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBeach from "@/assets/hero-beach.jpg";
import heroMountains from "@/assets/hero-mountains.jpg";
import heroCity from "@/assets/hero-city.jpg";

const heroImages = [
  { src: heroBeach, alt: "Tropical beach paradise" },
  { src: heroMountains, alt: "Mountain landscape" },
  { src: heroCity, alt: "City skyline" },
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-5xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-12">
          Explore the world's most beautiful destinations and create unforgettable memories
        </p>

        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card-hover max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                className="pl-10 h-12"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="When?"
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select className="flex-1 h-12 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Travel Type</option>
              <option value="flights">Flights</option>
              <option value="hotels">Hotels</option>
              <option value="packages">Holiday Packages</option>
            </select>
            <Button variant="hero" size="lg" className="sm:w-auto">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
