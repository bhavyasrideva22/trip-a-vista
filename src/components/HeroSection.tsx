import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarIcon, MapPin, X, Filter, DollarSign, Activity as ActivityIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import heroBeach from "@/assets/hero-beach.jpg";
import heroMountains from "@/assets/hero-mountains.jpg";
import heroCity from "@/assets/hero-city.jpg";

const heroImages = [
  { src: heroBeach, alt: "Tropical beach paradise" },
  { src: heroMountains, alt: "Mountain landscape" },
  { src: heroCity, alt: "City skyline" },
];

const destinations = [
  "Bali",
  "Paris",
  "Tokyo",
  "New York",
  "Santorini",
  "Maldives",
];

const tripTypes = [
  { value: "packages", label: "Package Tours" },
  { value: "hotels", label: "Hotels" },
  { value: "flights", label: "Flights" },
  { value: "car-rentals", label: "Car Rentals" },
];

const activities = [
  { id: "beach", label: "Beach" },
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture & History" },
  { id: "wildlife", label: "Wildlife" },
  { id: "nightlife", label: "Nightlife" },
  { id: "shopping", label: "Shopping" },
  { id: "wellness", label: "Wellness & Spa" },
  { id: "food", label: "Food & Dining" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSearch = () => {
    if (!destination) {
      toast.error("Please select a destination");
      return;
    }
    if (!travelType) {
      toast.error("Please select a travel type");
      return;
    }

    // Navigate to destinations page with search parameters
    navigate("/destinations", {
      state: {
        destination: destination,
        travelType: travelType,
        departureDate: departureDate ? format(departureDate, "yyyy-MM-dd") : null,
        returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : null,
        activities: selectedActivities,
        priceRange: priceRange,
      },
    });

    toast.success("Searching for the best options...");
  };

  const clearFilters = () => {
    setDestination("");
    setTravelType("");
    setDepartureDate(undefined);
    setReturnDate(undefined);
    setSelectedActivities([]);
    setPriceRange([0, 5000]);
  };

  const hasActiveFilters = destination || travelType || departureDate || returnDate || selectedActivities.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000;

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

        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card-hover max-w-6xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            {/* Main Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Destination */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="pl-10 h-12">
                    <SelectValue placeholder="Select Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {departureDate ? format(departureDate, "MMM dd") : "Departure"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Return Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {returnDate ? format(returnDate, "MMM dd") : "Return"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Travel Type */}
              <Select value={travelType} onValueChange={setTravelType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Trip Type" />
                </SelectTrigger>
                <SelectContent>
                  {tripTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between mb-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? "Hide" : "Show"} Advanced Filters
                {hasActiveFilters && !showFilters && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                )}
              </Button>
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="border-t pt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                {/* Activities */}
                <div>
                  <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <ActivityIcon className="h-4 w-4" />
                    Activities
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={activity.id}
                          checked={selectedActivities.includes(activity.id)}
                          onCheckedChange={() => toggleActivity(activity.id)}
                        />
                        <Label
                          htmlFor={activity.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {activity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$0</span>
                    <span>$5,000+</span>
                  </div>
                </div>
              </div>
            )}

            {/* Search Button */}
            <Button type="submit" variant="hero" size="lg" className="w-full mt-4">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
