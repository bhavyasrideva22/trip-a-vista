import DestinationCard from "./DestinationCard";
import parisImg from "@/assets/destination-paris.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import tokyoImg from "@/assets/destination-tokyo.jpg";
import santoriniImg from "@/assets/destination-santorini.jpg";
import newyorkImg from "@/assets/destination-newyork.jpg";
import baliImg from "@/assets/destination-bali.jpg";

const destinations = [
  {
    image: parisImg,
    title: "Paris",
    location: "France",
    price: "$1,299",
    rating: 4.9,
    reviews: 1234,
  },
  {
    image: maldivesImg,
    title: "Maldives",
    location: "Indian Ocean",
    price: "$2,499",
    rating: 5.0,
    reviews: 987,
  },
  {
    image: tokyoImg,
    title: "Tokyo",
    location: "Japan",
    price: "$1,799",
    rating: 4.8,
    reviews: 2156,
  },
  {
    image: santoriniImg,
    title: "Santorini",
    location: "Greece",
    price: "$1,599",
    rating: 4.9,
    reviews: 1543,
  },
  {
    image: newyorkImg,
    title: "New York",
    location: "USA",
    price: "$999",
    rating: 4.7,
    reviews: 3421,
  },
  {
    image: baliImg,
    title: "Bali",
    location: "Indonesia",
    price: "$1,199",
    rating: 4.8,
    reviews: 1876,
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of the world's most breathtaking destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
