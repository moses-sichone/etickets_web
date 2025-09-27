"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Ticket, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  CreditCard,
  Bell,
  Settings,
  Heart,
  TrendingUp,
  QrCode,
  Download,
  ExternalLink
} from "lucide-react";

// Mock data for dashboard
const upcomingBookings = [
  {
    id: 1,
    type: "venue",
    name: "Grand Ballroom",
    date: "2024-08-20",
    time: "6:00 PM - 11:00 PM",
    status: "confirmed",
    price: 3500,
    location: "Downtown",
    image: "/api/placeholder/200/150",
  },
  {
    id: 2,
    type: "event",
    name: "Summer Music Festival",
    date: "2024-07-15",
    time: "7:00 PM",
    status: "confirmed",
    price: 378,
    location: "Central Park",
    image: "/api/placeholder/200/150",
  },
];

const recentTickets = [
  {
    id: 1,
    eventName: "Tech Conference 2024",
    venue: "Convention Center",
    date: "2024-06-10",
    status: "used",
    ticketType: "VIP Pass",
    price: 399,
    qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
  },
  {
    id: 2,
    eventName: "Jazz Night Downtown",
    venue: "Blue Note Club",
    date: "2024-05-25",
    status: "upcoming",
    ticketType: "General Admission",
    price: 45,
    qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
  },
];

const stats = {
  totalBookings: 12,
  totalSpent: 8450,
  upcomingEvents: 3,
  favoriteVenues: 5,
};

const recommendations = [
  {
    id: 1,
    name: "Rooftop Cinema",
    type: "event",
    category: "Entertainment",
    date: "2024-07-20",
    price: 35,
    image: "/api/placeholder/300/200",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Garden Pavilion",
    type: "venue",
    category: "Wedding Venue",
    capacity: 200,
    price: 2500,
    image: "/api/placeholder/300/200",
    rating: 4.8,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "default",
      upcoming: "secondary",
      used: "outline",
      cancelled: "destructive",
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your bookings and events.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/account/profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">{formatPrice(stats.totalSpent)}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                  <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                </div>
                <Ticket className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Favorite Venues</p>
                  <p className="text-2xl font-bold">{stats.favoriteVenues}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="recommendations">For You</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>Your next venue bookings and events</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/account/bookings">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                            <img
                              src={booking.image}
                              alt={booking.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{booking.name}</h4>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(booking.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{formatPrice(booking.price)}</span>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest bookings and ticket purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Ticket className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{ticket.eventName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {ticket.venue} • {formatDate(ticket.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(ticket.status)}
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your venue bookings and event reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0">
                            <img
                              src={booking.image}
                              alt={booking.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{booking.name}</h3>
                                <p className="text-muted-foreground">{booking.location}</p>
                              </div>
                              {getStatusBadge(booking.status)}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Date:</span>
                                <p className="font-medium">{formatDate(booking.date)}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Time:</span>
                                <p className="font-medium">{booking.time}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Price:</span>
                                <p className="font-medium">{formatPrice(booking.price)}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm">View Details</Button>
                              <Button size="sm" variant="outline">Download Receipt</Button>
                              <Button size="sm" variant="outline">Modify Booking</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>View and manage your event tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <Card key={ticket.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                                <p className="text-muted-foreground">{ticket.venue}</p>
                              </div>
                              {getStatusBadge(ticket.status)}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Date:</span>
                                <p className="font-medium">{formatDate(ticket.date)}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Type:</span>
                                <p className="font-medium">{ticket.ticketType}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Price:</span>
                                <p className="font-medium">{formatPrice(ticket.price)}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status:</span>
                                <p className="font-medium capitalize">{ticket.status}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm">
                                <QrCode className="h-4 w-4 mr-1" />
                                Show QR Code
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Download PDF
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Add to Wallet
                              </Button>
                            </div>
                          </div>
                          
                          <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0">
                            <img
                              src={ticket.qrCode}
                              alt="QR Code"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>Based on your booking history and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 left-2">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            {item.type === "event" ? (
                              <p className="text-sm text-muted-foreground">
                                {formatDate(item.date)}
                              </p>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Up to {item.capacity} guests
                              </p>
                            )}
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}