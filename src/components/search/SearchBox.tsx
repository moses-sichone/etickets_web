"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Search, MapPin, Users, X } from "lucide-react";

interface SearchBoxProps {
  onSearch?: (params: SearchParams) => void;
  className?: string;
  variant?: "hero" | "compact" | "sidebar";
}

export interface SearchParams {
  q?: string;
  location?: string;
  date?: string;
  capacity?: string;
  category?: string;
  price_min?: string;
  price_max?: string;
}

export function SearchBox({ onSearch, className = "", variant = "hero" }: SearchBoxProps) {
  const router = useRouter();
  const [params, setParams] = useState<SearchParams>({
    q: "",
    location: "",
    date: "",
    capacity: "",
    category: "",
    price_min: "",
    price_max: "",
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });

    const queryString = searchParams.toString();
    const searchUrl = `/search${queryString ? `?${queryString}` : ""}`;

    if (onSearch) {
      onSearch(params);
    } else {
      router.push(searchUrl);
    }
  };

  const updateParam = (key: keyof SearchParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const getSelectedDate = () => {
    if (!params.date) return undefined;
    return new Date(params.date);
  };

  const inputSize = variant === "hero" ? "lg" : variant === "compact" ? "sm" : "default";
  const buttonSize = variant === "hero" ? "lg" : variant === "compact" ? "sm" : "default";

  return (
    <form onSubmit={handleSearch} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* What */}
        <div className="lg:col-span-2">
          <Label htmlFor="search-what" className="sr-only">
            What are you looking for?
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search-what"
              placeholder="Venues, events..."
              value={params.q}
              onChange={(e) => updateParam("q", e.target.value)}
              className={`pl-10 ${inputSize === "lg" ? "h-12" : ""}`}
              size={inputSize}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="search-location" className="sr-only">
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search-location"
              placeholder="Location"
              value={params.location}
              onChange={(e) => updateParam("location", e.target.value)}
              className={`pl-10 ${inputSize === "lg" ? "h-12" : ""}`}
              size={inputSize}
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="search-date" className="sr-only">
            Date
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${inputSize === "lg" ? "h-12" : ""}`}
                size={inputSize}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {params.date ? format(getSelectedDate()!, "PPP") : "Select date"}
                {params.date && (
                  <X
                    className="ml-auto h-4 w-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateParam("date", "");
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={getSelectedDate()}
                onSelect={(date) => {
                  if (date) {
                    updateParam("date", date.toISOString().split('T')[0]);
                    setCalendarOpen(false);
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Capacity */}
        <div>
          <Label htmlFor="search-capacity" className="sr-only">
            Guests
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Select
              value={params.capacity}
              onValueChange={(value) => updateParam("capacity", value)}
            >
              <SelectTrigger className={`pl-10 ${inputSize === "lg" ? "h-12" : ""}`}>
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="10">1-10 guests</SelectItem>
                <SelectItem value="25">11-25 guests</SelectItem>
                <SelectItem value="50">26-50 guests</SelectItem>
                <SelectItem value="100">51-100 guests</SelectItem>
                <SelectItem value="200">101-200 guests</SelectItem>
                <SelectItem value="500">201-500 guests</SelectItem>
                <SelectItem value="1000">500+ guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="search-category" className="sr-only">
            Category
          </Label>
          <Select
            value={params.category}
            onValueChange={(value) => updateParam("category", value)}
          >
            <SelectTrigger className={inputSize === "lg" ? "h-12" : ""}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="food">Food & Drink</SelectItem>
              <SelectItem value="arts">Arts & Theater</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" size={buttonSize} className="w-full">
        Search
      </Button>
    </form>
  );
}