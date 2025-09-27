"use client";

import { useState } from "react";
import { EventCard } from "@/components/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Search, 
  Calendar as CalendarIcon, 
  MapPin, 
  Star, 
  Users, 
  DollarSign, 
  Filter,
  Grid,
  List,
  Clock,
  Music,
  Trophy,
  Theater,
  Palette
} from "lucide-react";
import { format } from "date-fns";

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    description: "Experience the best of live music with top artists from around the world",
    date: "2024-07-15",
    time: "18:00",
    venue: "Central Park Amphitheater",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop",
    category: "Music",
    price: 89,
    rating: 4.9,
    availableTickets: 250,
    totalTickets: 500
  },
  {
    id: 2,
    title: "Tech Innovation Conference",
    description: "Join industry leaders for cutting-edge technology discussions and networking",
    date: "2024-08-20",
    time: "09:00",
    venue: "Convention Center",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=500&h=300&fit=crop",
    category: "Conference",
    price: 299,
    rating: 4.7,
    availableTickets: 150,
    totalTickets: 300
  },
  {
    id: 3,
    title: "Broadway: Hamilton",
    description: "The revolutionary Broadway musical that's taking the world by storm",
    date: "2024-07-25",
    time: "20:00",
    venue: "Majestic Theater",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1561156310-998a162b4546?w=500&h=300&fit=crop",
    category: "Theater",
    price: 150,
    rating: 5.0,
    availableTickets: 12,
    totalTickets: 200
  },
  {
    id: 4,
    title: "International Food Festival",
    description: "Taste cuisines from around the world with live cooking demonstrations",
    date: "2024-08-10",
    time: "11:00",
    venue: "Riverside Park",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop",
    category: "Food",
    price: 45,
    rating: 4.6,
    availableTickets: 500,
    totalTickets: 1000
  },
  {
    id: 5,
    title: "Championship Basketball Game",
    description: "Watch the finals of the national basketball championship",
    date: "2024-07-30",
    time: "19:30",
    venue: "Sports Arena",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop",
    category: "Sports",
    price: 120,
    rating: 4.8,
    availableTickets: 50,
    totalTickets: 15000
  },
  {
    id: 6,
    title: "Modern Art Exhibition",
    description: "Contemporary art showcase featuring emerging and established artists",
    date: "2024-08-05",
    time: "10:00",
    venue: "Art Gallery",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
    category: "Art",
    price: 25,
    rating: 4.5,
    availableTickets: 200,
    totalTickets: 500
  },
  {
    id: 7,
    title: "Jazz Night Under the Stars",
    description: "An intimate evening of smooth jazz in a beautiful outdoor setting",
    date: "2024-07-18",
    time: "20:00",
    venue: "Rooftop Terrace",
    location: "New Orleans, LA",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=300&fit=crop",
    category: "Music",
    price: 65,
    rating: 4.9,
    availableTickets: 80,
    totalTickets: 120
  },
  {
    id: 8,
    title: "Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to top investors",
    date: "2024-08-15",
    time: "14:00",
    venue: "Innovation Hub",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    category: "Business",
    price: 35,
    rating: 4.4,
    availableTickets: 300,
    totalTickets: 400
  }
];

const categories = [
  { name: "All", icon: null },
  { name: "Music", icon: Music },
  { name: "Sports", icon: Trophy },
  { name: "Theater", icon: Theater },
  { name: "Art", icon: Palette },
  { name: "Conference", icon: null },
  { name: "Food", icon: null },
  { name: "Business", icon: null }
];

const priceRanges = [
  { label: "Any Price", value: "any" },
  { label: "Under $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "Over $200", value: "200+" }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("any");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    let matchesPrice = true;
    if (selectedPriceRange !== "any") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      if (selectedPriceRange === "200+") {
        matchesPrice = event.price >= 200;
      } else {
        matchesPrice = event.price >= min && event.price <= max;
      }
    }

    let matchesDate = true;
    if (selectedDate) {
      const eventDate = new Date(event.date);
      matchesDate = eventDate.toDateString() === selectedDate.toDateString();
    }
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
  }).sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popularity":
        return (b.totalTickets - b.availableTickets) - (a.totalTickets - a.availableTickets);
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
            <h1 className="text-4xl font-bold mb-4">Discover Amazing Events</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find concerts, sports, theater, and more happening near you
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search events by name, venue, or location..."
                className="pl-12 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Filters */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm flex items-center gap-2"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {category.name}
                </Badge>
              );
            })}
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

                {/* Date Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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

                {/* Quick Filters */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Quick Filters</label>
                  <div className="space-y-2">
                    {[
                      { label: "This Weekend", value: "weekend" },
                      { label: "This Week", value: "week" },
                      { label: "Free Events", value: "free" },
                      { label: "Selling Fast", value: "fast" }
                    ].map((filter) => (
                      <label key={filter.value} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{filter.label}</span>
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
                    {filteredEvents.length} Events Found
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
                      <SelectItem value="date">Date: Soonest</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popularity">Most Popular</SelectItem>
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

              {/* Event Grid/List */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                  : "space-y-6"
                }>
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
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