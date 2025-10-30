import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import BookingDialog from "./BookingDialog";

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
}

const DestinationCard = ({ image, title, location, price, rating, reviews }: DestinationCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-scale-in">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {price}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-card-foreground mb-2">{title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="ml-1 text-sm font-semibold text-card-foreground">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => setIsBookingOpen(true)}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>

      <BookingDialog 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen}
        destination={title}
        price={price}
      />
    </>
  );
};

export default DestinationCard;
