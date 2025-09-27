import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Star } from "lucide-react";

interface TicketType {
  id: number;
  name: string;
  price: number;
  qty_available: number;
}

interface Event {
  id: number;
  title: string;
  venue: string;
  venue_id: number;
  start_time: string;
  ticket_types: TicketType[];
  category: string;
  image: string;
  // Additional properties for listing page
  description?: string;
  location?: string;
  time?: string;
  date?: string;
  price?: number;
  rating?: number;
  availableTickets?: number;
  totalTickets?: number;
}

interface EventCardProps {
  event: Event;
  viewMode?: "grid" | "list";
}

export function EventCard({ event, viewMode = "grid" }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTotalAvailable = () => {
    if (event.availableTickets !== undefined) return event.availableTickets;
    if (event.ticket_types && event.ticket_types.length > 0) {
      return event.ticket_types.reduce((total, ticket) => total + ticket.qty_available, 0);
    }
    return 0;
  };

  const getLowestPrice = () => {
    if (event.price) return event.price;
    if (event.ticket_types && event.ticket_types.length > 0) {
      return Math.min(...event.ticket_types.map(t => t.price));
    }
    return 0;
  };

  const isSoldOut = () => {
    return getTotalAvailable() === 0;
  };

  const getAvailabilityStatus = () => {
    const available = getTotalAvailable();
    if (available === 0) return { text: "Sold Out", variant: "destructive" as const };
    if (available < 10) return { text: "Few Left", variant: "secondary" as const };
    return { text: "Available", variant: "secondary" as const };
  };

  const availability = getAvailabilityStatus();

  // Use provided date/time or fallback to start_time
  const displayDate = event.date || event.start_time;
  const displayTime = event.time || event.start_time;
  const displayLocation = event.location || event.venue;

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Image */}
            <div className="flex-shrink-0 w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <Badge variant="outline">{event.category}</Badge>
                    <Badge variant={availability.variant}>{availability.text}</Badge>
                  </div>
                  {event.description && (
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                  )}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{displayLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(displayDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(displayTime)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(getLowestPrice())}
                    </p>
                  </div>
                  <Button 
                    asChild 
                    disabled={isSoldOut()}
                  >
                    <Link href={`/events/${event.id}`}>
                      {isSoldOut() ? "Sold Out" : "Get Tickets"}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Ticket Options:</p>
                <div className="flex flex-wrap gap-4">
                  {event.ticket_types && event.ticket_types.slice(0, 3).map((ticket) => (
                    <div key={ticket.id} className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{ticket.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-medium">{formatPrice(ticket.price)}</span>
                      {ticket.qty_available > 0 && (
                        <span className="text-xs text-muted-foreground">
                          ({ticket.qty_available} left)
                        </span>
                      )}
                    </div>
                  ))}
                  {event.ticket_types && event.ticket_types.length > 3 && (
                    <span className="text-sm text-muted-foreground">
                      +{event.ticket_types.length - 3} more types
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-white/90">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={availability.variant} className="bg-background/90 backdrop-blur">
            {availability.text}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{displayLocation}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(displayDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatTime(displayTime)}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Ticket Types */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Ticket Options:</p>
          <div className="space-y-1">
            {event.ticket_types && event.ticket_types.slice(0, 2).map((ticket) => (
              <div key={ticket.id} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{ticket.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatPrice(ticket.price)}</span>
                  {ticket.qty_available > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({ticket.qty_available} left)
                    </span>
                  )}
                </div>
              </div>
            ))}
            {event.ticket_types && event.ticket_types.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{event.ticket_types.length - 2} more ticket types
              </p>
            )}
          </div>
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(getLowestPrice())}
            </p>
          </div>
          <Button 
            asChild 
            size="sm"
            disabled={isSoldOut()}
          >
            <Link href={`/events/${event.id}`}>
              {isSoldOut() ? "Sold Out" : "Get Tickets"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}