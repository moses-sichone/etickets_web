import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Star, Wifi, ParkingIcon, Coffee } from "lucide-react";

interface Venue {
  id: number;
  name: string;
  short_description: string;
  main_image_url: string;
  lat: number;
  lng: number;
  min_price: number;
  max_price: number;
  capacity: number;
  rating: number;
  location: string;
  amenities?: string[];
}

interface VenueCardProps {
  venue: Venue;
}

const amenityIcons = {
  wifi: Wifi,
  parking: ParkingIcon,
  catering: Coffee,
};

export function VenueCard({ venue }: VenueCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={venue.main_image_url}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            {venue.rating}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1">{venue.name}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{venue.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Up to {venue.capacity.toLocaleString()} guests</span>
          </div>
          <p className="text-sm line-clamp-2">{venue.short_description}</p>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Amenities */}
        {venue.amenities && venue.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {venue.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
              return Icon ? (
                <Badge key={amenity} variant="outline" className="text-xs">
                  <Icon className="h-3 w-3 mr-1" />
                  {amenity}
                </Badge>
              ) : null;
            })}
            {venue.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{venue.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(venue.min_price)}
            </p>
          </div>
          <Button asChild size="sm">
            <Link href={`/venues/${venue.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}