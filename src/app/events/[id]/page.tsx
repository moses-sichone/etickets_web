"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Share2, 
  Heart,
  Ticket,
  CreditCard,
  QrCode,
  Download,
  Smartphone,
  Car,
  Bus,
  Camera,
  Music,
  Mic,
  Coffee,
  Wifi
} from "lucide-react";

// Mock event data
const mockEvent = {
  id: 1,
  title: "Summer Music Festival 2024",
  description: "Join us for the biggest music festival of the summer! Featuring top artists from around the world, food trucks, art installations, and an unforgettable atmosphere. This all-day event showcases multiple stages with different genres, from rock and pop to electronic and indie music.",
  short_description: "The biggest music festival of the summer featuring top international artists",
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
  ],
  venue: {
    id: 45,
    name: "Central Park Amphitheater",
    address: "Central Park West, New York, NY 10024",
    city: "New York",
    state: "NY",
    lat: 40.7829,
    lng: -73.9654,
  },
  schedule: {
    start_time: "2024-07-15T12:00:00Z",
    end_time: "2024-07-16T02:00:00Z",
    doors_open: "2024-07-15T11:00:00Z",
    schedule_items: [
      { time: "12:00 PM", artist: "Opening Acts", stage: "Main Stage" },
      { time: "2:00 PM", artist: "The Echoes", stage: "Main Stage" },
      { time: "4:00 PM", artist: "Neon Dreams", stage: "Electronic Stage" },
      { time: "6:00 PM", artist: "Midnight Sun", stage: "Main Stage" },
      { time: "8:00 PM", artist: "Stellar", stage: "Main Stage" },
      { time: "10:00 PM", artist: "Headliner: Aurora", stage: "Main Stage" },
    ],
  },
  ticket_types: [
    {
      id: 1,
      name: "General Admission",
      description: "Access to all general areas and stages",
      price: 89,
      qty_available: 120,
      qty_total: 500,
      includes: ["All stages access", "Food court area", "Restrooms"],
    },
    {
      id: 2,
      name: "VIP Pass",
      description: "Premium experience with exclusive benefits",
      price: 189,
      qty_available: 20,
      qty_total: 100,
      includes: [
        "All GA benefits",
        "VIP lounge access",
        "Premium viewing areas",
        "Complimentary drinks",
        "Fast lane entry",
      ],
    },
    {
      id: 3,
      name: "Platinum Experience",
      description: "Ultimate festival experience with backstage access",
      price: 389,
      qty_available: 5,
      qty_total: 20,
      includes: [
        "All VIP benefits",
        "Backstage access",
        "Meet & greet opportunities",
        "Gourmet dining",
        "Dedicated concierge",
      ],
    },
  ],
  amenities: [
    { id: "food", name: "Food Court", icon: Coffee, description: "Multiple food vendors and trucks" },
    { id: "wifi", name: "Free WiFi", icon: Wifi, description: "Available throughout the venue" },
    { id: "parking", name: "Parking", icon: Car, description: "Paid parking available nearby" },
    { id: "transport", name: "Public Transport", icon: Bus, description: "Subway and bus stops nearby" },
  ],
  policies: {
    refund: "Full refund available up to 48 hours before the event",
    exchange: "Tickets can be transferred to another person up to 24 hours before the event",
    weather: "Event is rain or shine. No refunds for weather-related cancellations",
    prohibited: "Outside food, drinks, professional cameras, and recording equipment prohibited",
  },
  category: "Music",
  organizer: {
    name: "Live Nation Productions",
    contact: "events@livenation.com",
    phone: "+1 (555) 123-4567",
  },
  rating: 4.7,
  review_count: 342,
  has_seating: false, // This would be true for events with seat maps
  age_restriction: "All ages welcome",
};

export default function EventDetailPage() {
  const params = useParams();
  const [selectedTickets, setSelectedTickets] = useState<{[key: number]: number}>({});
  const [activeTab, setActiveTab] = useState("tickets");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const updateTicketQuantity = (ticketTypeId: number, quantity: number) => {
    if (quantity < 0) quantity = 0;
    
    const ticketType = mockEvent.ticket_types.find(t => t.id === ticketTypeId);
    if (ticketType && quantity > ticketType.qty_available) {
      quantity = ticketType.qty_available;
    }
    
    setSelectedTickets(prev => ({
      ...prev,
      [ticketTypeId]: quantity
    }));
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, qty) => total + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketTypeId, qty]) => {
      const ticketType = mockEvent.ticket_types.find(t => t.id === parseInt(ticketTypeId));
      return total + (ticketType ? ticketType.price * qty : 0);
    }, 0);
  };

  const handleAddToCart = () => {
    if (getTotalTickets() === 0) {
      alert("Please select at least one ticket");
      return;
    }
    // Add to cart logic here
    console.log("Adding to cart:", selectedTickets);
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) return { text: "Sold Out", variant: "destructive" as const, color: "bg-red-500" };
    if (percentage < 20) return { text: "Few Left", variant: "secondary" as const, color: "bg-yellow-500" };
    if (percentage < 50) return { text: "Selling Fast", variant: "default" as const, color: "bg-orange-500" };
    return { text: "Available", variant: "default" as const, color: "bg-green-500" };
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {mockEvent.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={image}
                    alt={`${mockEvent.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {mockEvent.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {mockEvent.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(mockEvent.schedule.start_time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(mockEvent.schedule.start_time)} - {formatTime(mockEvent.schedule.end_time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{mockEvent.venue.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="secondary">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockEvent.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs for Details */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="venue">Venue Info</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tickets" className="space-y-4">
                <div className="space-y-4">
                  {mockEvent.ticket_types.map((ticketType) => {
                    const status = getAvailabilityStatus(ticketType.qty_available, ticketType.qty_total);
                    const selectedQty = selectedTickets[ticketType.id] || 0;
                    
                    return (
                      <Card key={ticketType.id} className="overflow-hidden">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{ticketType.name}</CardTitle>
                              <CardDescription className="mt-2">
                                {ticketType.description}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {formatPrice(ticketType.price)}
                              </div>
                              <Badge variant={status.variant} className="mt-2">
                                {status.text}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Includes */}
                          <div>
                            <h4 className="font-medium mb-2">Includes:</h4>
                            <ul className="space-y-1">
                              {ticketType.includes.map((item, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Availability */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Availability</span>
                              <span className="text-sm text-muted-foreground">
                                {ticketType.qty_available} of {ticketType.qty_total} left
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${status.color}`}
                                style={{
                                  width: `${(ticketType.qty_available / ticketType.qty_total) * 100}%`
                                }}
                              />
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Label htmlFor={`qty-${ticketType.id}`} className="text-sm font-medium">
                                Quantity:
                              </Label>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateTicketQuantity(ticketType.id, selectedQty - 1)}
                                  disabled={selectedQty <= 0}
                                >
                                  -
                                </Button>
                                <Input
                                  id={`qty-${ticketType.id}`}
                                  type="number"
                                  min="0"
                                  max={ticketType.qty_available}
                                  value={selectedQty}
                                  onChange={(e) => updateTicketQuantity(ticketType.id, parseInt(e.target.value) || 0)}
                                  className="w-16 text-center"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateTicketQuantity(ticketType.id, selectedQty + 1)}
                                  disabled={selectedQty >= ticketType.qty_available}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              {selectedQty > 0 && (
                                <div className="font-medium">
                                  {formatPrice(ticketType.price * selectedQty)}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                    <CardDescription>
                      Doors open at {formatTime(mockEvent.schedule.doors_open)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEvent.schedule.schedule_items.map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 border rounded-lg">
                          <div className="text-sm font-medium text-muted-foreground min-w-[80px]">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.artist}</h4>
                            <p className="text-sm text-muted-foreground">{item.stage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="venue" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{mockEvent.venue.name}</CardTitle>
                    <CardDescription>
                      {mockEvent.venue.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockEvent.amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <amenity.icon className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{amenity.name}</h4>
                            <p className="text-sm text-muted-foreground">{amenity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="policies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="refund">
                        <AccordionTrigger>Refund Policy</AccordionTrigger>
                        <AccordionContent>
                          {mockEvent.policies.refund}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="exchange">
                        <AccordionTrigger>Ticket Exchange</AccordionTrigger>
                        <AccordionContent>
                          {mockEvent.policies.exchange}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="weather">
                        <AccordionTrigger>Weather Policy</AccordionTrigger>
                        <AccordionContent>
                          {mockEvent.policies.weather}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="prohibited">
                        <AccordionTrigger>Prohibited Items</AccordionTrigger>
                        <AccordionContent>
                          {mockEvent.policies.prohibited}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Get Tickets
                  </CardTitle>
                  <CardDescription>
                    {mockEvent.age_restriction}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Summary */}
                  {getTotalTickets() > 0 && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{getTotalTickets()} ticket{getTotalTickets() !== 1 ? 's' : ''}</span>
                            <span>{formatPrice(getTotalPrice())}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span className="text-primary">
                              {formatPrice(getTotalPrice())}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={getTotalTickets() === 0}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {getTotalTickets() === 0 ? "Select Tickets" : `Add to Cart - ${formatPrice(getTotalPrice())}`}
                  </Button>

                  {/* Delivery Options */}
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Ticket Delivery</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">Mobile Tickets</h5>
                          <p className="text-xs text-muted-foreground">Instant delivery to your phone</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Download className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">PDF Tickets</h5>
                          <p className="text-xs text-muted-foreground">Print at home or save digitally</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Organizer Info */}
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-medium">Organizer</h4>
                    <div className="text-sm space-y-1">
                      <p>{mockEvent.organizer.name}</p>
                      <p className="text-muted-foreground">{mockEvent.organizer.contact}</p>
                      <p className="text-muted-foreground">{mockEvent.organizer.phone}</p>
                    </div>
                  </div>

                  {/* Event Rating */}
                  <Separator />
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mockEvent.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({mockEvent.review_count} reviews)
                    </span>
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