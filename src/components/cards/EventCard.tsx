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
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
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

  const getLowestPrice = () => {
    return Math.min(...event.ticket_types.map(t => t.price));
  };

  const getTotalAvailable = () => {
    return event.ticket_types.reduce((total, ticket) => total + ticket.qty_available, 0);
  };

  const isSoldOut = () => {
    return getTotalAvailable() === 0;
  };

  const getAvailabilityStatus = () => {
    const available = getTotalAvailable();
    if (available === 0) return { text: "Sold Out", variant: "destructive" as const };
    if (available < 10) return { text: "Few Left", variant: "secondary" as const };
    return { text: "Available", variant: "default" as const };
  };

  const availability = getAvailabilityStatus();

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
          <Badge variant={availability.variant} className="bg-white/90">
            {availability.text}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.start_time)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatTime(event.start_time)}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Ticket Types */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Ticket Options:</p>
          <div className="space-y-1">
            {event.ticket_types.slice(0, 2).map((ticket) => (
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
            {event.ticket_types.length > 2 && (
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