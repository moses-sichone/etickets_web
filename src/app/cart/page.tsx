"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartSummary } from "@/components/cart/CartSummary";
import { ArrowLeft, ShoppingBag, Heart, Clock } from "lucide-react";

export default function CartPage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <CartSummary onCheckout={handleCheckout} />
            
            {/* Empty State Suggestions */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>You might also like</CardTitle>
                  <CardDescription>
                    Popular venues and events trending now
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Suggestion 1 */}
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3" />
                        <h4 className="font-medium mb-1">Jazz Night Downtown</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Intimate jazz performances in the heart of the city
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">$45</span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Suggestion 2 */}
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3" />
                        <h4 className="font-medium mb-1">Rooftop Garden Party</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Beautiful venue with city skyline views
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">$2,500</span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Processing Time</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        2-3 minutes
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Customer Support</span>
                      <span className="text-green-600">24/7 Available</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      🎉 Special Offer
                    </h4>
                    <p className="text-sm text-blue-700">
                      First-time customers get 10% off their first booking! Use code WELCOME10 at checkout.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">
                      ✅ Price Match Guarantee
                    </h4>
                    <p className="text-sm text-green-700">
                      Found the same event or venue for less? We'll match the price.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Book With Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Secure Booking</h4>
                      <p className="text-xs text-muted-foreground">
                        Your payment and personal information are protected
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Satisfaction Guaranteed</h4>
                      <p className="text-xs text-muted-foreground">
                        30-day money-back guarantee on all bookings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Instant Confirmation</h4>
                      <p className="text-xs text-muted-foreground">
                        Get your tickets and booking confirmations immediately
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}