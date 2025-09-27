"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, MapPin, Calendar, Users, Menu, ShoppingCart, User, Heart, LogOut } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const { itemCount } = useCart();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const navigation = [
    { name: "Venues", href: "/venues" },
    { name: "Events", href: "/events" },
    { name: "Planners", href: "/planners" },
    { name: "Help", href: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <img
                  src="/logo.svg"
                  alt="TicketHub"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl">TicketHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                name="q"
                placeholder="Search venues, events..."
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register">
                    <User className="mr-2 h-4 w-4" />
                    Create Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/bookings">
                    <Calendar className="mr-2 h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/tickets">
                    <Heart className="mr-2 h-4 w-4" />
                    My Tickets
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Explore venues, events, and manage your bookings
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <Link
                      href="/account/dashboard"
                      className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/bookings"
                      className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/account/tickets"
                      className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      My Tickets
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden border-t p-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                name="q"
                placeholder="Search venues, events..."
                className="pl-10 pr-4"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}