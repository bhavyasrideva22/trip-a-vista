import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, MapPin, Clock, Users, Plane, Hotel, Utensils, 
  Activity, Coffee, Camera, Waves, Mountain, Building2,
  Luggage, Ticket, Sun, ChevronRight, Eye
} from "lucide-react";

interface DayActivity {
  time: string;
  activity: string;
  description: string;
  icon: React.ReactNode;
  location?: string;
}

interface DayItinerary {
  day: number;
  title: string;
  date: string;
  activities: DayActivity[];
  meals: string[];
  accommodation: string;
}

interface RoadmapPreviewProps {
  destination: string;
  departureDate?: string;
  returnDate?: string;
  travelers?: string;
  onViewFullRoadmap?: () => void;
}

const RoadmapPreview = ({ destination, departureDate, returnDate, travelers, onViewFullRoadmap }: RoadmapPreviewProps) => {
  const generateItinerary = (destination: string, startDate?: string): DayItinerary[] => {
    const start = startDate ? new Date(startDate) : new Date();
    const days: DayItinerary[] = [];
    
    const destinationData: Record<string, any> = {
      "Bali": {
        activities: [
          { time: "09:00", activity: "Arrival & Check-in", description: "Transfer from airport to hotel", icon: <Luggage className="h-4 w-4" />, location: "Ngurah Rai Airport → Ubud Resort" },
          { time: "12:00", activity: "Lunch", description: "Traditional Balinese cuisine", icon: <Utensils className="h-4 w-4" /> },
          { time: "14:00", activity: "Monkey Forest Visit", description: "Explore Ubud Monkey Forest Sanctuary", icon: <Activity className="h-4 w-4" />, location: "Ubud Monkey Forest" },
          { time: "18:00", activity: "Sunset at Tegalalang", description: "Rice terraces and dinner", icon: <Sun className="h-4 w-4" />, location: "Tegalalang Rice Terraces" },
        ],
        hotel: "Ubud Luxury Resort & Spa"
      },
      "Paris": {
        activities: [
          { time: "10:00", activity: "Arrival & Check-in", description: "Transfer from Charles de Gaulle Airport", icon: <Luggage className="h-4 w-4" />, location: "CDG Airport → Paris Center" },
          { time: "14:00", activity: "Eiffel Tower Tour", description: "Guided tour of Eiffel Tower", icon: <Building2 className="h-4 w-4" />, location: "Eiffel Tower" },
          { time: "16:00", activity: "Seine River Cruise", description: "Scenic boat tour along the Seine", icon: <Waves className="h-4 w-4" />, location: "Seine River" },
          { time: "19:00", activity: "Dinner Cruise", description: "Fine dining experience", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "Hotel des Invalides - Luxury Collection"
      },
      "Tokyo": {
        activities: [
          { time: "11:00", activity: "Arrival & Check-in", description: "Transfer from Narita Airport", icon: <Luggage className="h-4 w-4" />, location: "Narita Airport → Shibuya" },
          { time: "14:00", activity: "Shibuya Crossing", description: "World's busiest intersection", icon: <Activity className="h-4 w-4" />, location: "Shibuya District" },
          { time: "16:00", activity: "Senso-ji Temple", description: "Ancient Buddhist temple", icon: <Building2 className="h-4 w-4" />, location: "Asakusa" },
          { time: "18:00", activity: "Sushi Dinner", description: "Authentic sushi experience", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "The Ritz-Carlton Tokyo"
      },
      "New York": {
        activities: [
          { time: "10:00", activity: "Arrival & Check-in", description: "Transfer from JFK Airport", icon: <Luggage className="h-4 w-4" />, location: "JFK Airport → Manhattan" },
          { time: "14:00", activity: "Statue of Liberty", description: "Ferry tour to Liberty Island", icon: <Activity className="h-4 w-4" />, location: "Liberty Island" },
          { time: "16:00", activity: "Central Park Walk", description: "Guided walking tour", icon: <Mountain className="h-4 w-4" />, location: "Central Park" },
          { time: "19:00", activity: "Broadway Show", description: "Evening theater performance", icon: <Ticket className="h-4 w-4" />, location: "Broadway" },
        ],
        hotel: "The Plaza New York"
      },
      "Santorini": {
        activities: [
          { time: "12:00", activity: "Arrival & Check-in", description: "Transfer from airport to Oia", icon: <Luggage className="h-4 w-4" />, location: "Thira Airport → Oia" },
          { time: "15:00", activity: "Wine Tasting", description: "Local winery tour", icon: <Coffee className="h-4 w-4" />, location: "Santo Wines" },
          { time: "17:00", activity: "Oia Sunset", description: "Witness famous sunset views", icon: <Sun className="h-4 w-4" />, location: "Oia Village" },
          { time: "20:00", activity: "Greek Dinner", description: "Traditional Greek cuisine", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "Katikies Hotel Oia"
      },
      "Maldives": {
        activities: [
          { time: "13:00", activity: "Arrival & Check-in", description: "Seaplane transfer to resort", icon: <Luggage className="h-4 w-4" />, location: "Velana Airport → Resort" },
          { time: "15:00", activity: "Snorkeling", description: "Coral reef exploration", icon: <Waves className="h-4 w-4" />, location: "House Reef" },
          { time: "17:00", activity: "Spa Treatment", description: "Relaxing overwater spa", icon: <Activity className="h-4 w-4" /> },
          { time: "19:00", activity: "Overwater Dinner", description: "Dining over the lagoon", icon: <Utensils className="h-4 w-4" /> },
        ],
        hotel: "Conrad Maldives Rangali Island"
      }
    };

    const defaultData = {
      activities: [
        { time: "10:00", activity: "Arrival & Check-in", description: "Hotel check-in and welcome", icon: <Luggage className="h-4 w-4" /> },
        { time: "14:00", activity: "City Tour", description: "Guided exploration of the city", icon: <Activity className="h-4 w-4" /> },
        { time: "18:00", activity: "Welcome Dinner", description: "Local cuisine experience", icon: <Utensils className="h-4 w-4" /> },
      ],
      hotel: "Premium Hotel"
    };

    const data = destinationData[destination] || defaultData;

    // Show only first 3 days as preview
    for (let i = 0; i < 3; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      const dayActivities = i === 0 ? data.activities : [
        { time: "09:00", activity: "Breakfast", description: "Hotel breakfast buffet", icon: <Coffee className="h-4 w-4" /> },
        { time: "10:00", activity: `${destination} Exploration`, description: i === 1 ? "Historical sites tour" : "Cultural experiences", icon: <Activity className="h-4 w-4" /> },
        { time: "13:00", activity: "Lunch", description: "Local restaurant", icon: <Utensils className="h-4 w-4" /> },
        { time: "15:00", activity: destination === "Bali" ? "Temple Visit" : destination === "Paris" ? "Museum Tour" : destination === "Tokyo" ? "Garden Visit" : destination === "New York" ? "Museum Visit" : destination === "Santorini" ? "Beach Time" : "Water Activities", description: destination === "Bali" ? "Sacred temple tour" : destination === "Paris" ? "Louvre Museum" : destination === "Tokyo" ? "Imperial Gardens" : destination === "New York" ? "MoMA" : destination === "Santorini" ? "Red Beach" : "Water sports", icon: <Camera className="h-4 w-4" /> },
        { time: "19:00", activity: "Dinner", description: "Fine dining experience", icon: <Utensils className="h-4 w-4" /> },
      ];

      days.push({
        day: i + 1,
        title: i === 0 ? "Arrival & Welcome" : `Day ${i + 1}`,
        date: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        activities: dayActivities as DayActivity[],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: data.hotel
      });
    }

    return days;
  };

  const itinerary = generateItinerary(destination, departureDate);
  const endDate = returnDate || departureDate ? 
    (returnDate ? new Date(returnDate) : departureDate ? new Date(new Date(departureDate).getTime() + 6 * 24 * 60 * 60 * 1000) : null) : 
    null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Trip Roadmap Preview
            </CardTitle>
            <CardDescription>
              Your {destination} itinerary overview
            </CardDescription>
          </div>
          {onViewFullRoadmap && (
            <Button variant="outline" size="sm" onClick={onViewFullRoadmap}>
              <Eye className="mr-2 h-4 w-4" />
              View Full Roadmap
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Trip Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-semibold">{destination}</p>
            </div>
          </div>
          {departureDate && (
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-semibold text-sm">
                  {new Date(departureDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>
          )}
          {endDate && (
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Return</p>
                <p className="font-semibold text-sm">
                  {endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-sm">7 Days & 6 Nights</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Quick Flight & Hotel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm">Flight</h4>
            </div>
            {departureDate && (
              <p className="text-xs text-muted-foreground">
                Departure: {new Date(departureDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            )}
            {returnDate && (
              <p className="text-xs text-muted-foreground">
                Return: {new Date(returnDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">Round-trip flights included</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Hotel className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm">Accommodation</h4>
            </div>
            <p className="text-sm font-medium">{itinerary[0].accommodation}</p>
            <p className="text-xs text-muted-foreground mt-1">6 nights • All amenities included</p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Preview Itinerary - First 3 Days */}
        <div className="mb-4">
          <h4 className="font-semibold mb-4">Itinerary Preview (First 3 Days)</h4>
          <div className="space-y-6">
            {itinerary.map((day) => (
              <div key={day.day} className="border-l-2 border-primary/20 pl-4 relative">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="default" className="text-sm px-3 py-1">
                    Day {day.day}
                  </Badge>
                  <span className="font-semibold text-sm">{day.title}</span>
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                </div>
                <div className="space-y-3 ml-2">
                  {day.activities.slice(0, 3).map((activity, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex items-center justify-center w-16 h-8 rounded bg-primary/10 text-primary text-xs font-semibold">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 text-primary">
                            {activity.icon}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{activity.activity}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                            {activity.location && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              + 4 more days with complete itinerary
            </p>
          </div>
        </div>

        {onViewFullRoadmap && (
          <>
            <Separator className="my-6" />
            <Button onClick={onViewFullRoadmap} className="w-full" size="lg">
              View Complete Roadmap
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RoadmapPreview;

