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
import { TicketViewer } from "@/components/ticket-viewer/TicketViewer";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  Star,
  CreditCard,
  QrCode,
  Download,
  ExternalLink,
  Users
} from "lucide-react";

// Mock ticket data
const mockTickets = {
  upcoming: [
    {
      id: "1",
      eventName: "Summer Music Festival",
      venue: "Central Park Amphitheater",
      date: "2024-07-15",
      time: "7:00 PM",
      ticketType: "VIP Pass",
      price: 189,
      status: "upcoming" as const,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
      bookingId: "TK-2024-001",
      orderNumber: "ORD-2024-001234",
      seat: "VIP-A12",
      gate: "Gate A",
      section: "VIP Section",
    },
    {
      id: "2",
      eventName: "Tech Conference 2024",
      venue: "Convention Center",
      date: "2024-08-20",
      time: "9:00 AM",
      ticketType: "Early Bird",
      price: 299,
      status: "upcoming" as const,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
      bookingId: "TK-2024-002",
      orderNumber: "ORD-2024-001235",
      seat: "General-B45",
      gate: "Main Entrance",
      section: "Main Hall",
    },
  ],
  past: [
    {
      id: "3",
      eventName: "Jazz Night Downtown",
      venue: "Blue Note Club",
      date: "2024-06-10",
      time: "8:00 PM",
      ticketType: "General Admission",
      price: 45,
      status: "used" as const,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
      bookingId: "TK-2024-003",
      orderNumber: "ORD-2024-001236",
    },
    {
      id: "4",
      eventName: "Food & Wine Expo",
      venue: "Downtown Hall",
      date: "2024-05-25",
      time: "12:00 PM",
      ticketType: "VIP Tasting",
      price: 125,
      status: "used" as const,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
      bookingId: "TK-2024-004",
      orderNumber: "ORD-2024-001237",
    },
  ],
};

export default function TicketsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: "default",
      used: "secondary",
      cancelled: "destructive",
    } as const;
    
    const labels = {
      upcoming: "Upcoming",
      used: "Used",
      cancelled: "Cancelled",
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const filterTickets = (tickets: any[]) => {
    let filtered = tickets;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.venue.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
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

  const renderTicketCard = (ticket: any) => (
    <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{ticket.eventName}</h3>
                <p className="text-muted-foreground">{ticket.venue}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Booking ID: {ticket.bookingId}
                </p>
              </div>
              {getStatusBadge(ticket.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </div>
                <p className="font-medium">{formatDate(ticket.date)}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Time</span>
                </div>
                <p className="font-medium">{ticket.time}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Type</span>
                </div>
                <p className="font-medium">{ticket.ticketType}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price Paid</p>
                <p className="text-lg font-bold text-primary">{formatPrice(ticket.price)}</p>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setSelectedTicket(ticket.id)}>
                  <QrCode className="h-4 w-4 mr-1" />
                  View Ticket
                </Button>
                
                {ticket.status === "used" && (
                  <Button size="sm" variant="outline">
                    <Star className="h-4 w-4 mr-1" />
                    Rate Event
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:w-32 lg:h-32 bg-gray-200 rounded-lg flex-shrink-0">
            <img
              src={ticket.qrCode}
              alt="Ticket QR Code"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const currentTickets = mockTickets[activeTab as keyof typeof mockTickets] || [];
  const filteredTickets = filterTickets(currentTickets);

  const selectedTicketData = currentTickets.find(t => t.id === selectedTicket);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Tickets</h1>
              <p className="text-muted-foreground">
                View and manage your event tickets
              </p>
            </div>
            <Button asChild>
              <Link href="/search">
                <MapPin className="h-4 w-4 mr-2" />
                Find Events
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
                  placeholder="Search tickets..."
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
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
              Upcoming ({mockTickets.upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({mockTickets.past.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {filteredTickets.length > 0 ? (
              <div className="space-y-4">
                {filteredTickets.map(renderTicketCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming tickets</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any upcoming event tickets.
                  </p>
                  <Button asChild>
                    <Link href="/search">
                      <MapPin className="h-4 w-4 mr-2" />
                      Browse Events
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {filteredTickets.length > 0 ? (
              <div className="space-y-4">
                {filteredTickets.map(renderTicketCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past tickets</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't attended any events yet.
                  </p>
                  <Button asChild>
                    <Link href="/search">
                      <MapPin className="h-4 w-4 mr-2" />
                      Browse Events
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Ticket Viewer Modal */}
      {selectedTicketData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Ticket Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTicket(null)}
                >
                  ×
                </Button>
              </div>
              
              <TicketViewer ticket={selectedTicketData} />
              
              <div className="mt-6 flex justify-center">
                <Button onClick={() => setSelectedTicket(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}