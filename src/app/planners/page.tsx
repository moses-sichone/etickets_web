"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  DollarSign,
  Filter,
  Award,
  CheckCircle,
  MessageCircle
} from "lucide-react";

// Mock planner data
const mockPlanners = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Wedding & Event Planner",
    company: "Elegant Events Co.",
    description: "Specializing in luxury weddings and corporate events with over 10 years of experience",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    experience: 12,
    eventsPlanned: 450,
    priceRange: "$$$",
    specialties: ["Weddings", "Corporate Events", "Gala Dinners"],
    availability: "Available",
    responseTime: "2 hours",
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Corporate Event Specialist",
    company: "ProEvent Solutions",
    description: "Expert in corporate meetings, conferences, and team building events",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 89,
    experience: 8,
    eventsPlanned: 320,
    priceRange: "$$",
    specialties: ["Corporate Events", "Conferences", "Team Building"],
    availability: "Limited",
    responseTime: "4 hours",
    verified: true,
    featured: false
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Social Event Planner",
    company: "Celebrations Inc.",
    description: "Creating memorable birthday parties, anniversaries, and social gatherings",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 156,
    experience: 6,
    eventsPlanned: 280,
    priceRange: "$$",
    specialties: ["Birthday Parties", "Anniversaries", "Social Gatherings"],
    availability: "Available",
    responseTime: "1 hour",
    verified: true,
    featured: true
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Festival & Concert Producer",
    company: "Big Stage Productions",
    description: "Large-scale event production for festivals, concerts, and public events",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 203,
    experience: 15,
    eventsPlanned: 680,
    priceRange: "$$$$",
    specialties: ["Festivals", "Concerts", "Public Events"],
    availability: "Booked",
    responseTime: "24 hours",
    verified: true,
    featured: true
  },
  {
    id: 5,
    name: "Lisa Wang",
    title: "Cultural Event Coordinator",
    company: "Heritage Events",
    description: "Specializing in cultural celebrations, festivals, and traditional ceremonies",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 74,
    experience: 5,
    eventsPlanned: 150,
    priceRange: "$$",
    specialties: ["Cultural Events", "Festivals", "Traditional Ceremonies"],
    availability: "Available",
    responseTime: "3 hours",
    verified: false,
    featured: false
  },
  {
    id: 6,
    name: "James Mitchell",
    title: "Non-Profit Event Manager",
    company: "Community Impact Events",
    description: "Expert in fundraising galas, charity events, and community outreach programs",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 92,
    experience: 9,
    eventsPlanned: 210,
    priceRange: "$",
    specialties: ["Fundraising", "Charity Events", "Community Events"],
    availability: "Available",
    responseTime: "6 hours",
    verified: true,
    featured: false
  }
];

const specialties = [
  "All",
  "Weddings",
  "Corporate Events",
  "Birthday Parties",
  "Festivals",
  "Concerts",
  "Fundraising",
  "Cultural Events",
  "Social Gatherings"
];

const priceRanges = [
  { label: "Any Price", value: "any" },
  { label: "$", value: "$" },
  { label: "$$", value: "$$" },
  { label: "$$$", value: "$$$" },
  { label: "$$$$", value: "$$$$" }
];

const experienceLevels = [
  { label: "Any Experience", value: "any" },
  { label: "1-3 years", value: "1-3" },
  { label: "4-7 years", value: "4-7" },
  { label: "8+ years", value: "8+" }
];

export default function PlannersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("any");
  const [selectedExperience, setSelectedExperience] = useState("any");
  const [sortBy, setSortBy] = useState("rating");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredPlanners = mockPlanners.filter(planner => {
    const matchesSearch = planner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         planner.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         planner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         planner.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || planner.specialties.includes(selectedSpecialty);
    const matchesPrice = selectedPriceRange === "any" || planner.priceRange === selectedPriceRange;
    const matchesVerified = !showVerifiedOnly || planner.verified;
    
    let matchesExperience = true;
    if (selectedExperience !== "any") {
      if (selectedExperience === "1-3") {
        matchesExperience = planner.experience >= 1 && planner.experience <= 3;
      } else if (selectedExperience === "4-7") {
        matchesExperience = planner.experience >= 4 && planner.experience <= 7;
      } else if (selectedExperience === "8+") {
        matchesExperience = planner.experience >= 8;
      }
    }
    
    return matchesSearch && matchesSpecialty && matchesPrice && matchesVerified && matchesExperience;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return b.experience - a.experience;
      case "events":
        return b.eventsPlanned - a.eventsPlanned;
      case "price-low":
        return a.priceRange.length - b.priceRange.length;
      case "price-high":
        return b.priceRange.length - a.priceRange.length;
      case "reviews":
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const featuredPlanners = filteredPlanners.filter(planner => planner.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Professional Event Planners</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with experienced event planners who can bring your vision to life
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search planners by name, company, or specialty..."
                className="pl-12 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Planners */}
      {featuredPlanners.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Featured Planners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlanners.slice(0, 3).map((planner) => (
                <Card key={planner.id} className="border-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={planner.image} alt={planner.name} />
                        <AvatarFallback>{planner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{planner.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{planner.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{planner.rating}</span>
                          <span className="text-sm text-muted-foreground">({planner.reviewCount})</span>
                        </div>
                      </div>
                      {planner.verified && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{planner.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{planner.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{planner.experience} years</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                      {planner.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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

                {/* Specialty Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Specialty</label>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant={selectedSpecialty === specialty ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedSpecialty(specialty)}
                      >
                        {specialty}
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

                {/* Experience Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Experience Level</label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Verified Only */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Verified Planners Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Header with Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {filteredPlanners.length} Event Planners Found
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
                      <SelectItem value="experience">Most Experience</SelectItem>
                      <SelectItem value="events">Most Events</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Planner Cards */}
              {filteredPlanners.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No planners found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPlanners.map((planner) => (
                    <Card key={planner.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Profile Image */}
                          <div className="flex-shrink-0">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={planner.image} alt={planner.name} />
                              <AvatarFallback className="text-lg">
                                {planner.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          {/* Main Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-bold">{planner.name}</h3>
                                  {planner.verified && (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  )}
                                  {planner.featured && (
                                    <Badge variant="default" className="text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-lg text-muted-foreground mb-1">{planner.title}</p>
                                <p className="text-sm text-muted-foreground mb-3">{planner.company}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 mb-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{planner.rating}</span>
                                  <span className="text-sm text-muted-foreground">({planner.reviewCount} reviews)</span>
                                </div>
                                <Badge variant="outline">{planner.priceRange}</Badge>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4">{planner.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{planner.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{planner.experience} years experience</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{planner.eventsPlanned}+ events planned</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {planner.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${
                                    planner.availability === "Available" ? "bg-green-500" :
                                    planner.availability === "Limited" ? "bg-yellow-500" : "bg-red-500"
                                  }`} />
                                  <span>{planner.availability}</span>
                                </div>
                                <span>•</span>
                                <span>Responds in {planner.responseTime}</span>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Contact
                                </Button>
                                <Button size="sm">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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