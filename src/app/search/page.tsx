"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SearchBox, SearchParams } from "@/components/search/SearchBox";
import { VenueCard } from "@/components/cards/VenueCard";
import { EventCard } from "@/components/cards/EventCard";
import { 
  Search, 
  MapPin, 
  List, 
  Map, 
  Filter, 
  Star, 
  Users, 
  DollarSign, 
  Wifi, 
  Car,
  Coffee,
  Calendar,
  X
} from "lucide-react";

// Mock data for demonstration
const mockVenues = [
  {
    id: 1,
    name: "Grand Ballroom",
    short_description: "Elegant ballroom perfect for weddings and corporate events",
    main_image_url: "/api/placeholder/400/300",
    lat: 40.7589,
    lng: -73.9851,
    min_price: 2000,
    max_price: 5000,
    capacity: 500,
    rating: 4.8,
    location: "Downtown",
    amenities: ["wifi", "parking", "catering"],
  },
  {
    id: 2,
    name: "Garden Pavilion",
    short_description: "Beautiful outdoor venue with garden views",
    main_image_url: "/api/placeholder/400/300",
    lat: 40.7614,
    lng: -73.9776,
    min_price: 1200,
    max_price: 3000,
    capacity: 200,
    rating: 4.6,
    location: "Riverside",
    amenities: ["outdoor", "parking", "catering"],
  },
  {
    id: 3,
    name: "Sky Lounge",
    short_description: "Modern rooftop venue with city views",
    main_image_url: "/api/placeholder/400/300",
    lat: 40.7505,
    lng: -73.9934,
    min_price: 1500,
    max_price: 4000,
    capacity: 150,
    rating: 4.9,
    location: "Uptown",
    amenities: ["wifi", "bar", "city-view"],
  },
];

const mockEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    venue: "Central Park",
    venue_id: 45,
    start_time: "2024-07-15T19:00:00Z",
    ticket_types: [
      { id: 1, name: "GA", price: 89, qty_available: 120 },
      { id: 2, name: "VIP", price: 189, qty_available: 20 },
    ],
    category: "Music",
    image: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    venue: "Convention Center",
    venue_id: 46,
    start_time: "2024-08-20T09:00:00Z",
    ticket_types: [
      { id: 1, name: "Early Bird", price: 299, qty_available: 50 },
      { id: 2, name: "Regular", price: 399, qty_available: 100 },
    ],
    category: "Conference",
    image: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    venue: "Downtown Hall",
    venue_id: 47,
    start_time: "2024-09-10T12:00:00Z",
    ticket_types: [
      { id: 1, name: "General", price: 65, qty_available: 200 },
      { id: 2, name: "VIP Tasting", price: 125, qty_available: 50 },
    ],
    category: "Food",
    image: "/api/placeholder/400/300",
  },
];

const amenities = [
  { id: "wifi", name: "Free WiFi", icon: Wifi },
  { id: "parking", name: "Parking", icon: Car },
  { id: "catering", name: "Catering", icon: Coffee },
  { id: "outdoor", name: "Outdoor Space", icon: MapPin },
  { id: "bar", name: "Bar Service", icon: Coffee },
  { id: "city-view", name: "City View", icon: MapPin },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    rating: "",
    amenities: [] as string[],
    sortBy: "relevance",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Parse search parameters
  const searchQuery = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const date = searchParams.get("date") || "";
  const capacity = searchParams.get("capacity") || "";
  const category = searchParams.get("category") || "";

  // Combine venues and events for search results
  const searchResults = [...mockVenues, ...mockEvents];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      price_min: "",
      price_max: "",
      rating: "",
      amenities: [],
      sortBy: "relevance",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <SearchBox 
            variant="compact"
            onSearch={(params: SearchParams) => {
              // Handle search with new parameters
              const queryString = new URLSearchParams();
              Object.entries(params).forEach(([key, value]) => {
                if (value) queryString.set(key, value);
              });
              window.history.pushState({}, '', `/search?${queryString.toString()}`);
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg border p-4 sticky top-32">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                </div>

                <Accordion type="multiple" defaultValue={["price", "rating", "amenities"]} className="w-full">
                  {/* Price Range */}
                  <AccordionItem value="price">
                    <AccordionTrigger className="text-sm">Price Range</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Min"
                          type="number"
                          value={filters.price_min}
                          onChange={(e) => handleFilterChange("price_min", e.target.value)}
                        />
                        <Input
                          placeholder="Max"
                          type="number"
                          value={filters.price_max}
                          onChange={(e) => handleFilterChange("price_max", e.target.value)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Rating */}
                  <AccordionItem value="rating">
                    <AccordionTrigger className="text-sm">Rating</AccordionTrigger>
                    <AccordionContent>
                      <Select value={filters.rating} onValueChange={(value) => handleFilterChange("rating", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Minimum rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any rating</SelectItem>
                          <SelectItem value="4.5">4.5+ stars</SelectItem>
                          <SelectItem value="4">4+ stars</SelectItem>
                          <SelectItem value="3.5">3.5+ stars</SelectItem>
                          <SelectItem value="3">3+ stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Amenities */}
                  <AccordionItem value="amenities">
                    <AccordionTrigger className="text-sm">Amenities</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      {amenities.map((amenity) => (
                        <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity.id)}
                            onChange={() => handleAmenityToggle(amenity.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{amenity.name}</span>
                        </label>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator className="my-4" />

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort by</label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {searchQuery ? `Results for "${searchQuery}"` : "All Venues & Events"}
                  </h1>
                  <p className="text-muted-foreground">
                    {searchResults.length} results found
                    {location && ` in ${location}`}
                    {date && ` on ${new Date(date).toLocaleDateString()}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Filters */}
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                          Narrow down your search results
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Filters</h3>
                          <Button variant="ghost" size="sm" onClick={clearFilters}>
                            Clear all
                          </Button>
                        </div>
                        {/* Mobile filters content similar to desktop */}
                        <Accordion type="multiple" defaultValue={["price", "rating", "amenities"]} className="w-full">
                          <AccordionItem value="price">
                            <AccordionTrigger className="text-sm">Price Range</AccordionTrigger>
                            <AccordionContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  placeholder="Min"
                                  type="number"
                                  value={filters.price_min}
                                  onChange={(e) => handleFilterChange("price_min", e.target.value)}
                                />
                                <Input
                                  placeholder="Max"
                                  type="number"
                                  value={filters.price_max}
                                  onChange={(e) => handleFilterChange("price_max", e.target.value)}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="rating">
                            <AccordionTrigger className="text-sm">Rating</AccordionTrigger>
                            <AccordionContent>
                              <Select value={filters.rating} onValueChange={(value) => handleFilterChange("rating", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Minimum rating" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="">Any rating</SelectItem>
                                  <SelectItem value="4.5">4.5+ stars</SelectItem>
                                  <SelectItem value="4">4+ stars</SelectItem>
                                  <SelectItem value="3.5">3.5+ stars</SelectItem>
                                  <SelectItem value="3">3+ stars</SelectItem>
                                </SelectContent>
                              </Select>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* View Toggle */}
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-r-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "map" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("map")}
                      className="rounded-l-none"
                    >
                      <Map className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {viewMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((item) => {
                  if ("ticket_types" in item) {
                    return <EventCard key={item.id} event={item} />;
                  } else {
                    return <VenueCard key={item.id} venue={item} />;
                  }
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-6">
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Map view coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}