"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Search, MapPin, Calendar, Users, Star, Music, Trophy, Coffee } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    if (date) params.set("date", date);
    if (capacity) params.set("capacity", capacity);
    
    router.push(`/search?${params.toString()}`);
  };

  const categories = [
    { name: "Music", icon: Music, href: "/search?category=music" },
    { name: "Sports", icon: Trophy, href: "/search?category=sports" },
    { name: "Family", icon: Users, href: "/search?category=family" },
    { name: "Food & Drink", icon: Coffee, href: "/search?category=food" },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: "Summer Music Festival",
      venue: "Central Park",
      date: "2024-07-15",
      price: 89,
      image: "/api/placeholder/400/300",
      category: "Music",
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      venue: "Convention Center",
      date: "2024-08-20",
      price: 299,
      image: "/api/placeholder/400/300",
      category: "Conference",
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      venue: "Downtown Hall",
      date: "2024-09-10",
      price: 65,
      image: "/api/placeholder/400/300",
      category: "Food",
    },
  ];

  const popularVenues = [
    {
      id: 1,
      name: "Grand Ballroom",
      location: "Downtown",
      capacity: 500,
      price: 2000,
      rating: 4.8,
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "Garden Pavilion",
      location: "Riverside",
      capacity: 200,
      price: 1200,
      rating: 4.6,
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "Sky Lounge",
      location: "Uptown",
      capacity: 150,
      price: 1500,
      rating: 4.9,
      image: "/api/placeholder/300/200",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Venues and Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find the perfect venue for your event or get tickets to unforgettable experiences
            </p>
            
            {/* Hero Search Form */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 text-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Guests"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full mt-4">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:text-primary/80" />
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Link href="/events" className="text-primary hover:underline">
              View all events →
            </Link>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {featuredEvents.map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2">{event.category}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" />
                          {event.venue}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">${event.price}</span>
                        <Button asChild>
                          <Link href={`/events/${event.id}`}>Get Tickets</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Popular Venues Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Popular Venues</h2>
            <Link href="/venues" className="text-primary hover:underline">
              View all venues →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{venue.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      {venue.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      Up to {venue.capacity} guests
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                      </div>
                      <span className="text-2xl font-bold">From ${venue.price}</span>
                    </div>
                    <Button asChild>
                      <Link href={`/venues/${venue.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Host Your Event?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            List your venue and start reaching thousands of event planners
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/venues/list">List Your Venue</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}