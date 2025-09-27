"use client";

import { useState } from "react";
import { VenueCard } from "@/components/cards/VenueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  DollarSign, 
  Filter,
  Grid,
  List,
  Calendar
} from "lucide-react";

// Mock venue data
const mockVenues = [
  {
    id: 1,
    name: "The Grand Hall",
    description: "Elegant event space perfect for weddings and corporate events",
    location: "Downtown City Center",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
    rating: 4.8,
    capacity: 300,
    priceRange: "$$",
    amenities: ["WiFi", "Parking", "Catering", "AV Equipment"],
    upcomingEvents: 5
  },
  {
    id: 2,
    name: "Skyline Rooftop",
    description: "Modern rooftop venue with stunning city views",
    location: "Business District",
    image: "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4?w=500&h=300&fit=crop",
    rating: 4.6,
    capacity: 150,
    priceRange: "$$$",
    amenities: ["Outdoor Space", "Bar", "Heating", "City Views"],
    upcomingEvents: 3
  },
  {
    id: 3,
    name: "Garden Pavilion",
    description: "Beautiful outdoor venue surrounded by lush gardens",
    location: "Riverside Park",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=300&fit=crop",
    rating: 4.9,
    capacity: 200,
    priceRange: "$$",
    amenities: ["Garden", "Tent", "Restrooms", "Power"],
    upcomingEvents: 8
  },
  {
    id: 4,
    name: "Industrial Loft",
    description: "Trendy industrial space for creative events",
    location: "Arts District",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
    rating: 4.5,
    capacity: 100,
    priceRange: "$$",
    amenities: ["High Ceilings", "Exposed Brick", "Kitchen", "Loading Dock"],
    upcomingEvents: 2
  },
  {
    id: 5,
    name: "Conference Center",
    description: "State-of-the-art facility for business meetings and conferences",
    location: "Tech Hub",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
    rating: 4.7,
    capacity: 500,
    priceRange: "$$$",
    amenities: ["Projectors", "WiFi", "Catering", "Parking"],
    upcomingEvents: 12
  },
  {
    id: 6,
    name: "Beachside Venue",
    description: "Stunning oceanfront location for memorable events",
    location: "Coastal Area",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=300&fit=crop",
    rating: 4.9,
    capacity: 250,
    priceRange: "$$$$",
    amenities: ["Ocean View", "Beach Access", "Sunset Deck", "Catering"],
    upcomingEvents: 6
  }
];

const categories = [
  "All",
  "Wedding",
  "Corporate",
  "Conference",
  "Party",
  "Outdoor",
  "Indoor",
  "Unique"
];

const priceRanges = [
  { label: "Any Price", value: "any" },
  { label: "$", value: "$" },
  { label: "$$", value: "$$" },
  { label: "$$$", value: "$$$" },
  { label: "$$$$", value: "$$$$" }
];

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("any");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");

  const filteredVenues = mockVenues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = selectedPriceRange === "any" || venue.priceRange === selectedPriceRange;
    
    return matchesSearch && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "capacity":
        return b.capacity - a.capacity;
      case "price-low":
        return a.priceRange.length - b.priceRange.length;
      case "price-high":
        return b.priceRange.length - a.priceRange.length;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Amazing Venues</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect venue for your next event, from intimate gatherings to grand celebrations
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search venues by name, location, or type..."
                className="pl-12 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-card rounded-lg border p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Price Range</label>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Popular Amenities</label>
                  <div className="space-y-2">
                    {["WiFi", "Parking", "Catering", "AV Equipment", "Outdoor Space"].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Header with Sort and View Toggle */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {filteredVenues.length} Venues Found
                  </h2>
                  <p className="text-muted-foreground">
                    {searchQuery && `Showing results for "${searchQuery}"`}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="capacity">Largest Capacity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Venue Grid/List */}
              {filteredVenues.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No venues found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                  : "space-y-6"
                }>
                  {filteredVenues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}