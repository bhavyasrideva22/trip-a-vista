import DestinationCard from "./DestinationCard";
import parisImg from "@/assets/destination-paris.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import tokyoImg from "@/assets/destination-tokyo.jpg";
import santoriniImg from "@/assets/destination-santorini.jpg";
import newyorkImg from "@/assets/destination-newyork.jpg";
import baliImg from "@/assets/destination-bali.jpg";

const allDestinations = [
  {
    image: parisImg,
    title: "Paris",
    location: "France",
    price: "$1,299",
    priceValue: 1299,
    rating: 4.9,
    reviews: 1234,
    activities: ["culture", "food", "shopping"],
  },
  {
    image: maldivesImg,
    title: "Maldives",
    location: "Indian Ocean",
    price: "$2,499",
    priceValue: 2499,
    rating: 5.0,
    reviews: 987,
    activities: ["beach", "wellness", "adventure"],
  },
  {
    image: tokyoImg,
    title: "Tokyo",
    location: "Japan",
    price: "$1,799",
    priceValue: 1799,
    rating: 4.8,
    reviews: 2156,
    activities: ["culture", "food", "shopping", "nightlife"],
  },
  {
    image: santoriniImg,
    title: "Santorini",
    location: "Greece",
    price: "$1,599",
    priceValue: 1599,
    rating: 4.9,
    reviews: 1543,
    activities: ["beach", "culture", "wellness", "food"],
  },
  {
    image: newyorkImg,
    title: "New York",
    location: "USA",
    price: "$999",
    priceValue: 999,
    rating: 4.7,
    reviews: 3421,
    activities: ["culture", "shopping", "nightlife", "food"],
  },
  {
    image: baliImg,
    title: "Bali",
    location: "Indonesia",
    price: "$1,199",
    priceValue: 1199,
    rating: 4.8,
    reviews: 1876,
    activities: ["beach", "adventure", "wellness", "culture"],
  },
];

interface DestinationsSectionProps {
  searchParams?: {
    destination?: string;
    travelType?: string;
    departureDate?: string;
    returnDate?: string;
    date?: string;
    activities?: string[];
    priceRange?: number[];
  } | null;
}

const DestinationsSection = ({ searchParams }: DestinationsSectionProps = {}) => {
  // Filter destinations based on search
  let filteredDestinations = allDestinations;

  // Filter by destination
  if (searchParams?.destination) {
    const searchTerm = searchParams.destination.toLowerCase();
    filteredDestinations = filteredDestinations.filter(
      (dest) =>
        dest.title.toLowerCase().includes(searchTerm) ||
        dest.location.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by price range
  if (searchParams?.priceRange) {
    const [minPrice, maxPrice] = searchParams.priceRange;
    filteredDestinations = filteredDestinations.filter(
      (dest) => dest.priceValue >= minPrice && dest.priceValue <= maxPrice
    );
  }

  // Filter by activities
  if (searchParams?.activities && searchParams.activities.length > 0) {
    filteredDestinations = filteredDestinations.filter((dest) =>
      searchParams.activities!.some((activity) =>
        dest.activities.includes(activity)
      )
    );
  }

  // If no results found, show all destinations with a message
  const showNoResults = searchParams && filteredDestinations.length === 0;

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {!searchParams && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of the world's most breathtaking destinations
            </p>
          </div>
        )}

        {showNoResults ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No destinations found matching your search criteria
            </p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search parameters
            </p>
          </div>
        ) : (
          <>
            {searchParams && filteredDestinations.length > 0 && (
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Found {filteredDestinations.length} result{filteredDestinations.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DestinationCard {...destination} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DestinationsSection;
