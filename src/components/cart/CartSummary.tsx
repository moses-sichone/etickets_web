"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Minus, Ticket, MapPin, Calendar, Users } from "lucide-react";

interface CartSummaryProps {
  onCheckout?: () => void;
  className?: string;
}

export function CartSummary({ onCheckout, className = "" }: CartSummaryProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getPlatformFee = () => {
    return getSubtotal() * 0.05; // 5% platform fee
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getTotal = () => {
    return getSubtotal() + getPlatformFee() + getTax();
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Your Cart
          </CardTitle>
          <CardDescription>Your cart is empty</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Add venues, events, or tickets to your cart to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Your Cart
              <Badge variant="secondary">{items.length} item{items.length !== 1 ? 's' : ''}</Badge>
            </CardTitle>
            <CardDescription>
              Review your selections before checkout
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    {item.type === "venue" && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.capacity} guests
                        </div>
                      </>
                    )}
                    {item.type === "ticket" && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.description}
                        </div>
                      </>
                    )}
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {item.type === "venue" ? "Venue Booking" : 
                     item.type === "ticket" ? "Event Ticket" : "Add-on"}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 text-center h-8"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} each
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo-code" className="text-sm font-medium">
            Promo Code
          </Label>
          <div className="flex gap-2">
            <Input
              id="promo-code"
              placeholder="Enter promo code"
              className="flex-1"
            />
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(getSubtotal())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Platform Fee (5%)</span>
            <span>{formatPrice(getPlatformFee())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>{formatPrice(getTax())}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(getTotal())}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>

        {/* Security Note */}
        <p className="text-xs text-muted-foreground text-center">
          🔒 Secure checkout powered by Stripe. Your payment information is encrypted and secure.
        </p>
      </CardContent>
    </Card>
  );
}