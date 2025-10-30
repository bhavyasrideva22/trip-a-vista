import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, Calendar, Users, MapPin, Lock, CheckCircle2, 
  Mail, Phone, Hotel, Plane, Utensils, Activity, Clock 
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BookingData {
  name: string;
  email: string;
  date: string;
  travelers: string;
  destination: string;
  price: string;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (location.state) {
      setBookingData(location.state as BookingData);
    } else {
      // If no booking data, redirect to home
      toast.error("No booking information found");
      navigate("/");
    }
  }, [location, navigate]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/\//g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardData({ ...cardData, expiryDate: formatted });
  };

  const getFinalTotal = () => {
    const baseTotal = calculateTotal();
    const serviceFee = 49;
    const taxes = Math.round(baseTotal * 0.1);
    return baseTotal + serviceFee + taxes;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    toast.success(`Payment successful! $${getFinalTotal().toLocaleString()} charged. Your booking is confirmed.`);
    setTimeout(() => {
      navigate("/ticket", {
        state: { bookingData }
      });
    }, 2000);
  };

  if (!bookingData) {
    return null;
  }

  const calculateTotal = () => {
    const price = parseInt(bookingData.price.replace(/[^0-9]/g, ""));
    const travelers = parseInt(bookingData.travelers);
    const total = price * travelers;
    return total;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Complete Your Payment
              </h1>
              <p className="text-muted-foreground">Secure and easy payment process</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Booking Summary with Complete Info */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your trip details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Traveler Information */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Traveler Information</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Users className="h-3 w-3" />
                          <span>Name</span>
                        </div>
                        <p className="font-semibold text-sm">{bookingData.name}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Mail className="h-3 w-3" />
                          <span>Email</span>
                        </div>
                        <p className="font-semibold text-sm">{bookingData.email}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Users className="h-3 w-3" />
                          <span>Travelers</span>
                        </div>
                        <p className="font-semibold text-sm">{bookingData.travelers} {bookingData.travelers === "1" ? "person" : "people"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Trip Details */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Trip Details</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>Destination</span>
                        </div>
                        <p className="font-semibold">{bookingData.destination}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>Departure Date</span>
                        </div>
                        <p className="font-semibold text-sm">
                          {new Date(bookingData.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Clock className="h-3 w-3" />
                          <span>Duration</span>
                        </div>
                        <p className="font-semibold text-sm">7 Days & 6 Nights</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Package Includes */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Package Includes</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Plane className="h-3 w-3 text-primary" />
                        <span>Flights</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Hotel className="h-3 w-3 text-primary" />
                        <span>Hotel</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Utensils className="h-3 w-3 text-primary" />
                        <span>Meals</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Activity className="h-3 w-3 text-primary" />
                        <span>Activities</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Price Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Per Person</span>
                        <span className="font-semibold">{bookingData.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Travelers</span>
                        <span className="font-semibold">× {bookingData.travelers}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">${calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span className="font-semibold">$49</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes & Fees</span>
                        <span className="font-semibold">${Math.round(calculateTotal() * 0.1).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between pt-2">
                        <span className="font-bold text-base">Total</span>
                        <span className="font-bold text-primary text-lg">
                          ${(calculateTotal() + 49 + Math.round(calculateTotal() * 0.1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mt-3 w-full justify-center">
                      Save 10% on your next booking
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your payment details to complete the booking</CardDescription>
                  </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("card")}
                        className="w-full"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "paypal" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("paypal")}
                        className="w-full"
                      >
                        PayPal
                      </Button>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <Label htmlFor="cardHolder">Cardholder Name</Label>
                          <Input
                            id="cardHolder"
                            placeholder="John Doe"
                            value={cardData.cardHolder}
                            onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={cardData.cardNumber}
                            onChange={handleCardNumberChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardData.expiryDate}
                              onChange={handleExpiryChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              maxLength={4}
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="flex items-center justify-center py-8 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">PayPal integration will redirect to PayPal</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Confirm Payment
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Important Travel Information */}
              <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/10">
                <CardHeader>
                  <CardTitle className="text-lg">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="font-medium">✓ You will receive a booking confirmation email shortly</p>
                  <p className="font-medium">✓ All travel documents will be sent to your email within 24 hours</p>
                  <p className="font-medium">✓ Full refund available if cancelled 7 days before departure</p>
                  <p className="font-medium">✓ Contact support at support@travelwise.com for any questions</p>
                </CardContent>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;

