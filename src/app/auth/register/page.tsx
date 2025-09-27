"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Building,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // Account Type
    accountType: "customer",
    companyName: "",
    
    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    
    // Preferences
    newsletter: false,
    termsAccepted: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return false;
    }
    
    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (formData.accountType === "business" && !formData.companyName) {
      setError("Company name is required for business accounts");
      return false;
    }
    
    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      setError("Please fill in all address fields");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Registration successful:", formData);
      setSuccess("Account created successfully! Please check your email to verify your account.");
      
      // Redirect to login after successful registration
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return 0;
    if (password.length < 12) return 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/)) return 2;
    return 3;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-12 h-12">
              <img
                src="/logo.svg"
                alt="TicketHub"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold ml-2">TicketHub</span>
          </div>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepNumber ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {stepNumber === 1 ? "Personal" : stepNumber === 2 ? "Address" : "Preferences"}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > stepNumber ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join thousands of users discovering amazing venues and events
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex space-x-1">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full ${
                              passwordStrength >= index ? strengthColors[passwordStrength] : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: {strengthLabels[passwordStrength]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select 
                    value={formData.accountType} 
                    onValueChange={(value) => handleSelectChange("accountType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer (I want to book venues/events)</SelectItem>
                      <SelectItem value="business">Business (I want to list my venue)</SelectItem>
                      <SelectItem value="organizer">Event Organizer (I want to host events)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.accountType === "business" && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Company name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required={formData.accountType === "business"}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Address Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleSelectChange("state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="12345"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => handleSelectChange("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, newsletter: checked as boolean }))
                      }
                    />
                    <label htmlFor="newsletter" className="text-sm leading-relaxed cursor-pointer">
                      I would like to receive email updates about special offers, new events, and venue recommendations.
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                      }
                    />
                    <label htmlFor="termsAccepted" className="text-sm leading-relaxed cursor-pointer">
                      I have read and agree to the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      . *
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Account Benefits</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Save favorite venues and events</li>
                    <li>• Track your booking history</li>
                    <li>• Get personalized recommendations</li>
                    <li>• Exclusive member-only offers</li>
                    <li>• Faster checkout with saved information</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <Button type="button" onClick={handleNextStep}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.termsAccepted}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}