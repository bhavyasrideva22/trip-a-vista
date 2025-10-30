import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel, Package, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import DestinationsSection from "@/components/DestinationsSection";
import RoadmapPreview from "@/components/RoadmapPreview";
import Footer from "@/components/Footer";

const Destinations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<any>(null);

  useEffect(() => {
    // Scroll to top of page after navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Get search parameters from navigation state
    if (location.state) {
      setSearchParams(location.state);
    }
  }, [location]);

  const handleViewFullRoadmap = () => {
    // Navigate to roadmap page with search params
    if (searchParams?.destination) {
      navigate("/trip-roadmap", {
        state: {
          destination: searchParams.destination,
          date: searchParams.departureDate || searchParams.date || new Date().toISOString().split('T')[0],
          travelers: "1",
          price: "$0",
          name: "",
          email: "",
        }
      });
    }
  };

  const getTravelTypeIcon = (type: string) => {
    switch (type) {
      case "flights":
        return <Plane className="h-4 w-4" />;
      case "hotels":
        return <Hotel className="h-4 w-4" />;
      case "packages":
        return <Package className="h-4 w-4" />;
      case "car-rentals":
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTravelTypeLabel = (type: string) => {
    switch (type) {
      case "flights":
        return "Flights";
      case "hotels":
        return "Hotels";
      case "packages":
        return "Holiday Packages";
      case "car-rentals":
        return "Car Rentals";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-24 pb-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 animate-fade-in">
              {searchParams ? (
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-6 flex-wrap">
                    {searchParams.travelType && (
                      <Badge variant="default" className="text-lg px-4 py-2">
                        {getTravelTypeIcon(searchParams.travelType)}
                        <span className="ml-2">{getTravelTypeLabel(searchParams.travelType)}</span>
                      </Badge>
                    )}
                    {searchParams.destination && (
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        To: {searchParams.destination}
                      </Badge>
                    )}
                    {searchParams.departureDate && (
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        Departure: {formatDate(searchParams.departureDate)}
                      </Badge>
                    )}
                    {searchParams.returnDate && (
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        Return: {formatDate(searchParams.returnDate)}
                      </Badge>
                    )}
                    {searchParams.date && (
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        {formatDate(searchParams.date)}
                      </Badge>
                    )}
                    {searchParams.priceRange && (
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        ${searchParams.priceRange[0].toLocaleString()} - ${searchParams.priceRange[1].toLocaleString()}
                      </Badge>
                    )}
                    {searchParams.activities && searchParams.activities.length > 0 && (
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        {searchParams.activities.length} Activity{searchParams.activities.length > 1 ? "ies" : ""}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                    Search Results
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Showing results for your search
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                    Discover Amazing Destinations
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Browse through our collection of carefully curated travel destinations
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        <DestinationsSection searchParams={searchParams} />
        
        {/* Roadmap Preview Section */}
        {searchParams?.destination && (
          <section className="py-10 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <RoadmapPreview
                destination={searchParams.destination}
                departureDate={searchParams.departureDate || searchParams.date}
                returnDate={searchParams.returnDate}
                travelers={searchParams.travelers}
                onViewFullRoadmap={handleViewFullRoadmap}
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;

