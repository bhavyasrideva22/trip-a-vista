import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0ea5e9&color=fff",
    rating: 5,
    comment: "Amazing experience! The booking process was smooth and the trip exceeded all expectations. Highly recommended!",
    destination: "Paris Trip",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Tokyo, Japan",
    image: "https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff",
    rating: 5,
    comment: "Best travel platform I've used. Great customer service and amazing destinations. Will definitely book again!",
    destination: "Bali Adventure",
  },
  {
    id: 3,
    name: "Emma Davis",
    location: "London, UK",
    image: "https://ui-avatars.com/api/?name=Emma+Davis&background=f43f5e&color=fff",
    rating: 5,
    comment: "TravelWise made planning our honeymoon so easy. The Maldives package was perfect in every way!",
    destination: "Maldives Escape",
  },
  {
    id: 4,
    name: "David Martinez",
    location: "Barcelona, Spain",
    image: "https://ui-avatars.com/api/?name=David+Martinez&background=06b6d4&color=fff",
    rating: 5,
    comment: "Excellent value for money. The Tokyo trip was well-organized and the highlights were unforgettable.",
    destination: "Tokyo Discovery",
  },
  {
    id: 5,
    name: "Rachel Brown",
    location: "Sydney, Australia",
    image: "https://ui-avatars.com/api/?name=Rachel+Brown&background=84cc16&color=fff",
    rating: 5,
    comment: "Professional service from start to finish. Santorini was absolutely breathtaking! Highly recommend this agency.",
    destination: "Santorini Getaway",
  },
  {
    id: 6,
    name: "James Wilson",
    location: "Toronto, Canada",
    image: "https://ui-avatars.com/api/?name=James+Wilson&background=ea580c&color=fff",
    rating: 5,
    comment: "From the moment we booked to returning home, everything was seamless. New York never looked so good!",
    destination: "New York Experience",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real travelers who booked with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-card-hover transition-shadow animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                  <p className="text-muted-foreground italic">{testimonial.comment}</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-primary font-medium">{testimonial.destination}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

