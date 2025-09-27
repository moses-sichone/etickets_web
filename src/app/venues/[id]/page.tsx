"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Users, 
  Star, 
  Clock, 
  Wifi, 
  Car, 
  Coffee, 
  Camera, 
  Music,
  Phone,
  Mail,
  Share2,
  Heart,
  Calendar as CalendarIcon,
  DollarSign
} from "lucide-react";

// Mock venue data
const mockVenue = {
  id: 1,
  name: "Grand Ballroom",
  description: "Experience elegance and sophistication in our stunning Grand Ballroom. This magnificent venue features crystal chandeliers, marble floors, and floor-to-ceiling windows that offer breathtaking views of the city skyline. Perfect for weddings, galas, corporate events, and special celebrations.",
  short_description: "Elegant ballroom perfect for weddings and corporate events",
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
  ],
  location: {
    address: "123 Event Street, Downtown, City 12345",
    city: "Downtown",
    state: "City",
    zip: "12345",
    lat: 40.7589,
    lng: -73.9851,
  },
  capacity: 500,
  pricing: {
    min_price: 2000,
    max_price: 5000,
    pricing_rules: [
      { type: "weekday", price: 2000, description: "Monday - Thursday" },
      { type: "weekend", price: 3500, description: "Friday - Sunday" },
      { type: "holiday", price: 5000, description: "Holidays & Special Events" },
    ],
  },
  amenities: [
    { id: "wifi", name: "Free WiFi", icon: Wifi, description: "High-speed internet throughout the venue" },
    { id: "parking", name: "Parking", icon: Car, description: "Complimentary parking for 200 cars" },
    { id: "catering", name: "Catering Kitchen", icon: Coffee, description: "Full-service catering kitchen available" },
    { id: "av", name: "AV Equipment", icon: Music, description: "State-of-the-art sound and lighting" },
    { id: "decor", name: "Event Decor", icon: Camera, description: "In-house decoration services" },
  ],
  availability: [
    { date: "2024-07-15", slots: ["morning", "afternoon", "evening"] },
    { date: "2024-07-16", slots: ["morning", "afternoon"] },
    { date: "2024-07-17", slots: ["evening"] },
    { date: "2024-07-18", slots: ["morning", "afternoon", "evening"] },
    { date: "2024-07-19", slots: ["afternoon", "evening"] },
  ],
  policies: {
    cancellation: "Free cancellation up to 30 days before the event",
    payment: "50% deposit required to book, balance due 7 days before event",
    insurance: "Event insurance recommended for all bookings",
    capacity: "Minimum 50 guests, maximum 500 guests",
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "events@grandballroom.com",
    website: "www.grandballroom.com",
  },
  rating: 4.8,
  review_count: 156,
  reviews: [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2024-06-15",
      comment: "Absolutely stunning venue! Our wedding was perfect here. The staff was incredibly helpful and the space is breathtaking."
    },
    {
      id: 2,
      author: "Mike Chen",
      rating: 4,
      date: "2024-05-20",
      comment: "Great venue for our corporate event. The AV equipment was top-notch and the location is very convenient."
    },
  ],
};

const timeSlots = [
  { id: "morning", label: "Morning (8AM - 12PM)", price: 2000 },
  { id: "afternoon", label: "Afternoon (12PM - 5PM)", price: 2500 },
  { id: "evening", label: "Evening (5PM - 11PM)", price: 3500 },
];

export default function VenueDetailPage() {
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [guestCount, setGuestCount] = useState<string>("100");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAvailableSlots = (date: Date | undefined) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    const availability = mockVenue.availability.find(a => a.date === dateStr);
    return availability ? availability.slots : [];
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot");
      return;
    }
    // Navigate to booking page or open booking modal
    console.log("Booking:", { date: selectedDate, slot: selectedSlot, guests: guestCount });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {mockVenue.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={image}
                    alt={`${mockVenue.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold">{mockVenue.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {mockVenue.rating} ({mockVenue.review_count} reviews)
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-4">
                {mockVenue.short_description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{mockVenue.location.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Up to {mockVenue.capacity} guests</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockVenue.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs for Details */}
            <Tabs defaultValue="amenities" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="amenities" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockVenue.amenities.map((amenity) => (
                    <Card key={amenity.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <amenity.icon className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">{amenity.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {amenity.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pricing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Options</CardTitle>
                    <CardDescription>
                      Choose the perfect time slot for your event
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockVenue.pricing.pricing_rules.map((rule, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{rule.description}</h4>
                          <p className="text-sm text-muted-foreground">Full day access</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            {formatPrice(rule.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="policies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Venue Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Cancellation Policy</h4>
                      <p className="text-sm text-muted-foreground">
                        {mockVenue.policies.cancellation}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Payment Terms</h4>
                      <p className="text-sm text-muted-foreground">
                        {mockVenue.policies.payment}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Insurance</h4>
                      <p className="text-sm text-muted-foreground">
                        {mockVenue.policies.insurance}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Capacity Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        {mockVenue.policies.capacity}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                {mockVenue.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{review.author}</CardTitle>
                          <CardDescription>
                            {new Date(review.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Book This Venue
                  </CardTitle>
                  <CardDescription>
                    Select your preferred date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Date</label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Time Slot Selection */}
                  {selectedDate && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time Slot</label>
                      <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableSlots(selectedDate).map((slot) => {
                            const slotInfo = timeSlots.find(t => t.id === slot);
                            return (
                              <SelectItem key={slot} value={slot}>
                                {slotInfo?.label} - {formatPrice(slotInfo?.price || 0)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Guest Count */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Number of Guests</label>
                    <Select value={guestCount} onValueChange={setGuestCount}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 guests</SelectItem>
                        <SelectItem value="100">100 guests</SelectItem>
                        <SelectItem value="150">150 guests</SelectItem>
                        <SelectItem value="200">200 guests</SelectItem>
                        <SelectItem value="300">300 guests</SelectItem>
                        <SelectItem value="500">500 guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Summary */}
                  {selectedSlot && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Venue Rental</span>
                            <span>
                              {formatPrice(timeSlots.find(t => t.id === selectedSlot)?.price || 0)}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span className="text-primary">
                              {formatPrice(timeSlots.find(t => t.id === selectedSlot)?.price || 0)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Book Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBookNow}
                    disabled={!selectedDate || !selectedSlot}
                  >
                    Book Now
                  </Button>

                  {/* Contact Info */}
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{mockVenue.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{mockVenue.contact.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}