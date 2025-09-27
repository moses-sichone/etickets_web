"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  CreditCard
} from "lucide-react";

// Mock booking data
const mockBookings = {
  upcoming: [
    {
      id: 1,
      type: "venue",
      name: "Grand Ballroom",
      date: "2024-08-20",
      time: "6:00 PM - 11:00 PM",
      status: "confirmed",
      price: 3500,
      location: "Downtown",
      capacity: 300,
      amenities: ["WiFi", "Parking", "Catering"],
      image: "/api/placeholder/300/200",
      bookingId: "BK-2024-001",
    },
    {
      id: 2,
      type: "venue",
      name: "Garden Pavilion",
      date: "2024-09-15",
      time: "2:00 PM - 10:00 PM",
      status: "confirmed",
      price: 2800,
      location: "Riverside",
      capacity: 150,
      amenities: ["Outdoor", "Garden", "Parking"],
      image: "/api/placeholder/300/200",
      bookingId: "BK-2024-002",
    },
  ],
  past: [
    {
      id: 3,
      type: "venue",
      name: "Sky Lounge",
      date: "2024-05-10",
      time: "7:00 PM - 12:00 AM",
      status: "completed",
      price: 4200,
      location: "Uptown",
      capacity: 200,
      amenities: ["Rooftop", "Bar", "City View"],
      image: "/api/placeholder/300/200",
      bookingId: "BK-2024-003",
    },
    {
      id: 4,
      type: "venue",
      name: "Conference Hall A",
      date: "2024-04-05",
      time: "9:00 AM - 5:00 PM",
      status: "completed",
      price: 1800,
      location: "Business District",
      capacity: 100,
      amenities: ["AV Equipment", "WiFi", "Catering"],
      image: "/api/placeholder/300/200",
      bookingId: "BK-2024-004",
    },
  ],
  cancelled: [
    {
      id: 5,
      type: "venue",
      name: "Beachfront Venue",
      date: "2024-06-20",
      time: "4:00 PM - 11:00 PM",
      status: "cancelled",
      price: 3200,
      location: "Coastal Area",
      capacity: 250,
      amenities: ["Beach", "Outdoor", "Parking"],
      image: "/api/placeholder/300/200",
      bookingId: "BK-2024-005",
      cancellationReason: "Weather concerns",
    },
  ],
};

export default function BookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

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

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "default",
      completed: "secondary",
      cancelled: "destructive",
      pending: "outline",
    } as const;
    
    const labels = {
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
      pending: "Pending",
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const filterBookings = (bookings: any[]) => {
    let filtered = bookings;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (sortBy === "date-desc") {
        return dateB.getTime() - dateA.getTime();
      } else if (sortBy === "date-asc") {
        return dateA.getTime() - dateB.getTime();
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      } else if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      return 0;
    });

    return filtered;
  };

  const renderBookingCard = (booking: any) => (
    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 lg:h-48 bg-gray-200 rounded-lg flex-shrink-0">
            <img
              src={booking.image}
              alt={booking.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{booking.name}</h3>
                <p className="text-muted-foreground">{booking.location}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Booking ID: {booking.bookingId}
                </p>
              </div>
              {getStatusBadge(booking.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </div>
                <p className="font-medium">{formatDate(booking.date)}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Time</span>
                </div>
                <p className="font-medium">{booking.time}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Capacity</span>
                </div>
                <p className="font-medium">{booking.capacity} guests</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Price</span>
                </div>
                <p className="font-medium">{formatPrice(booking.price)}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {booking.amenities.map((amenity: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
            
            {booking.cancellationReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  <strong>Cancellation Reason:</strong> {booking.cancellationReason}
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <Link href={`/account/bookings/${booking.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Link>
              </Button>
              
              {booking.status === "confirmed" && (
                <>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Modify
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Receipt
                  </Button>
                </>
              )}
              
              {booking.status === "completed" && (
                <Button size="sm" variant="outline">
                  <Star className="h-4 w-4 mr-1" />
                  Rate Venue
                </Button>
              )}
              
              {(booking.status === "confirmed" || booking.status === "pending") && (
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const currentBookings = mockBookings[activeTab as keyof typeof mockBookings] || [];
  const filteredBookings = filterBookings(currentBookings);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Bookings</h1>
              <p className="text-muted-foreground">
                Manage your venue bookings and reservations
              </p>
            </div>
            <Button asChild>
              <Link href="/search">
                <MapPin className="h-4 w-4 mr-2" />
                Book New Venue
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({mockBookings.upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({mockBookings.past.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({mockBookings.cancelled.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map(renderBookingCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any upcoming venue bookings.
                  </p>
                  <Button asChild>
                    <Link href="/search">
                      <MapPin className="h-4 w-4 mr-2" />
                      Browse Venues
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map(renderBookingCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't completed any venue bookings yet.
                  </p>
                  <Button asChild>
                    <Link href="/search">
                      <MapPin className="h-4 w-4 mr-2" />
                      Browse Venues
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled">
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map(renderBookingCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No cancelled bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't cancelled any venue bookings.
                  </p>
                  <Button asChild>
                    <Link href="/search">
                      <MapPin className="h-4 w-4 mr-2" />
                      Browse Venues
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}