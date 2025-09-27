"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Password reset email sent to:", email);
      setIsSubmitted(true);
      
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <p className="text-muted-foreground">Reset your password</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSubmitted ? "Check your email" : "Forgot password?"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? "We've sent you a link to reset your password"
                : "Enter your email address and we'll send you a link to reset your password"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <>
                {/* Error Message */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Forgot Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send reset link
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to login
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Success Message */}
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Password reset link sent to <strong>{email}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Check your email for the reset link</li>
                      <li>• Click the link to create a new password</li>
                      <li>• The link will expire in 24 hours</li>
                      <li>• If you don't see the email, check your spam folder</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => router.push("/auth/login")}
                    >
                      Return to login
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail("");
                      }}
                    >
                      Try another email
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}