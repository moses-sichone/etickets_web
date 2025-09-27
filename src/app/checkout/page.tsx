"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  CreditCard, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Shield,
  Clock,
  Truck,
  Download,
  QrCode
} from "lucide-react";

type CheckoutStep = "contact" | "payment" | "review" | "confirmation";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: "contact", name: "Contact Info", icon: User },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "review", name: "Review", icon: CheckCircle },
    { id: "confirmation", name: "Confirmation", icon: CheckCircle },
  ] as const;

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("review");
  };

  const handleReviewSubmit = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep("confirmation");
    }, 3000);
  };

  const handleBack = () => {
    const stepOrder: CheckoutStep[] = ["contact", "payment", "review", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  // Mock order data
  const orderData = {
    items: [
      {
        id: "1",
        name: "Summer Music Festival - VIP Pass",
        type: "ticket" as const,
        quantity: 2,
        price: 189,
        date: "July 15, 2024",
        description: "Central Park Amphitheater",
      },
      {
        id: "2",
        name: "Grand Ballroom - Evening Slot",
        type: "venue" as const,
        quantity: 1,
        price: 3500,
        date: "August 20, 2024",
        description: "500 guests capacity",
      },
    ],
    subtotal: 3878,
    platformFee: 193.90,
    tax: 310.24,
    total: 4382.14,
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "contact":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Please provide your contact details for booking confirmation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={contactInfo.firstName}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={contactInfo.lastName}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    Continue to Payment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        );

      case "payment":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Enter your payment details to complete the booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Input
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Billing Address</h4>
                  
                  <div>
                    <Label htmlFor="billingAddress">Street Address *</Label>
                    <Input
                      id="billingAddress"
                      value={paymentInfo.billingAddress}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, billingAddress: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City *</Label>
                      <Input
                        id="billingCity"
                        value={paymentInfo.billingCity}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, billingCity: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingState">State *</Label>
                      <Select value={paymentInfo.billingState} onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, billingState: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="billingZip">ZIP Code *</Label>
                      <Input
                        id="billingZip"
                        value={paymentInfo.billingZip}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, billingZip: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your payment information is encrypted and secure. We never store your full card details.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit">
                    Review Order
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        );

      case "review":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                        <Badge variant="outline" className="mt-1">
                          {item.type === "ticket" ? "Ticket" : "Venue"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Platform Fee (5%)</span>
                    <span>{formatPrice(orderData.platformFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(orderData.tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(orderData.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{contactInfo.firstName} {contactInfo.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{contactInfo.phone}</span>
                  </div>
                  {contactInfo.company && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{contactInfo.company}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I have read and agree to the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      . I understand that all sales are final subject to the cancellation policy.
                    </label>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="marketing"
                      checked={acceptMarketing}
                      onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                    />
                    <label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer">
                      I would like to receive email updates about special offers, new events, and venue recommendations.
                    </label>
                  </div>
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    By completing this purchase, you agree to our cancellation policy. Venue bookings can be cancelled up to 30 days before the event for a full refund. Event tickets are non-refundable unless the event is cancelled.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleReviewSubmit}
                    disabled={!acceptTerms || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Purchase
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "confirmation":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your booking has been confirmed and details have been sent to {contactInfo.email}.
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono font-bold">#TK-{Date.now().toString().slice(-8)}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold text-primary">{formatPrice(orderData.total)}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Tickets
                    </span>
                    <Button size="sm" variant="outline">
                      PDF
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      Mobile Tickets
                    </span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1 text-left">
                    <li>• Check your email for confirmation and tickets</li>
                    <li>• Add event dates to your calendar</li>
                    <li>• Download tickets before arriving at the venue</li>
                    <li>• Contact support if you have any questions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button size="lg" onClick={() => router.push("/account/dashboard")}>
                View My Bookings
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}