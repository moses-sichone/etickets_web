"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Mail, 
  Phone, 
  MessageCircle, 
  BookOpen,
  HelpCircle,
  Ticket,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight
} from "lucide-react";

// Mock FAQ data
const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Sign In' in the top right corner, then select 'Create Account'. Fill in your details including name, email, and password. You'll receive a confirmation email to verify your account."
      },
      {
        question: "Is TicketHub free to use?",
        answer: "Yes, browsing and searching for events and venues is completely free. We only charge a small service fee when you make a booking or purchase tickets."
      },
      {
        question: "How do I reset my password?",
        answer: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a link to reset your password."
      }
    ]
  },
  {
    category: "Booking & Tickets",
    questions: [
      {
        question: "How do I book a venue?",
        answer: "Browse our venues page, select your preferred venue, choose your date and time, add any additional services, and proceed to checkout. You'll receive a confirmation email once your booking is complete."
      },
      {
        question: "Can I cancel my booking?",
        answer: "Cancellation policies vary by venue and event. Check the specific terms during booking. Most venues allow cancellations up to 48 hours before the event, but some may have different policies."
      },
      {
        question: "How do I get my tickets?",
        answer: "After purchasing, you'll receive an email with your tickets attached as PDF. You can also view and download your tickets from your account dashboard under 'My Tickets'."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital wallets like Apple Pay and Google Pay."
      }
    ]
  },
  {
    category: "Event Planners",
    questions: [
      {
        question: "How do I become a verified event planner?",
        answer: "Create a professional profile, complete your portfolio with past events, verify your identity and business credentials, and maintain a high rating from client reviews."
      },
      {
        question: "How much does it cost to list my services?",
        answer: "Basic listing is free. We offer premium subscription plans with additional features like featured placement, advanced analytics, and priority support."
      },
      {
        question: "How do I communicate with clients?",
        answer: "Use our built-in messaging system to communicate with clients. You can also share your contact information once a booking is confirmed."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "The website isn't loading properly",
        answer: "Try clearing your browser cache and cookies, or try using a different browser. If the problem persists, contact our technical support team."
      },
      {
        question: "I can't complete my payment",
        answer: "Check that your payment details are correct and that your card has sufficient funds. If using a digital wallet, ensure it's properly set up. Contact your bank if the issue continues."
      },
      {
        question: "How do I report a technical issue?",
        answer: "Use the contact form below or email us at support@tickethub.com with details about the issue, including screenshots if possible."
      }
    ]
  }
];

// Mock help articles
const helpArticles = [
  {
    title: "Getting Started with TicketHub",
    description: "Learn the basics of navigating our platform and finding what you need",
    category: "Getting Started",
    readTime: "5 min",
    icon: BookOpen
  },
  {
    title: "How to Book Your First Venue",
    description: "Step-by-step guide to booking the perfect venue for your event",
    category: "Booking",
    readTime: "8 min",
    icon: MapPin
  },
  {
    title: "Understanding Ticket Types",
    description: "Learn about different ticket types and what they include",
    category: "Tickets",
    readTime: "6 min",
    icon: Ticket
  },
  {
    title: "Managing Your Account",
    description: "How to update your profile, view bookings, and manage preferences",
    category: "Account",
    readTime: "7 min",
    icon: User
  },
  {
    title: "Payment and Billing",
    description: "Everything you need to know about payments, fees, and refunds",
    category: "Payment",
    readTime: "10 min",
    icon: CreditCard
  },
  {
    title: "Event Planning Tips",
    description: "Expert advice for planning successful events",
    category: "Planning",
    readTime: "12 min",
    icon: Calendar
  }
];

// Mock contact options
const contactOptions = [
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    icon: MessageCircle,
    availability: "Available now",
    action: "Start Chat"
  },
  {
    title: "Email Support",
    description: "Get help via email within 24 hours",
    icon: Mail,
    availability: "24/7",
    action: "Send Email"
  },
  {
    title: "Phone Support",
    description: "Speak with a support representative",
    icon: Phone,
    availability: "Mon-Fri, 9AM-6PM",
    action: "Call Us"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for contacting us! We'll get back to you soon.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                className="pl-12 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {["Getting Started", "Booking", "Tickets", "Account", "Payment", "Planning"].map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSearchQuery(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="articles">Help Articles</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="status">System Status</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or browse all categories
                    </p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((category) => (
                      <div key={category.category} className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                        {category.questions.map((item, index) => (
                          <AccordionItem key={index} value={`${category.category}-${index}`}>
                            <AccordionTrigger className="text-left">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </div>
                    ))}
                  </Accordion>
                )}
              </div>
            </TabsContent>

            {/* Help Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Help Articles</h2>
                
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or browse all articles
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, index) => {
                      const Icon = article.icon;
                      return (
                        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="h-8 w-8 text-primary" />
                              <Badge variant="secondary">{article.category}</Badge>
                            </div>
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{article.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                              <Button variant="ghost" size="sm">
                                Read More
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Contact Options */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      {contactOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-3">
                                <Icon className="h-8 w-8 text-primary" />
                                <div>
                                  <h4 className="font-semibold">{option.title}</h4>
                                  <p className="text-sm text-muted-foreground">{option.availability}</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                              <Button size="sm" className="w-full">
                                {option.action}
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Name</label>
                              <Input
                                required
                                value={contactForm.name}
                                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                placeholder="Your full name"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Email</label>
                              <Input
                                required
                                type="email"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Subject</label>
                            <Input
                              required
                              value={contactForm.subject}
                              onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                              placeholder="How can we help you?"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Message</label>
                            <textarea
                              required
                              className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                              value={contactForm.message}
                              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                              placeholder="Please describe your issue or question in detail..."
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Send Message
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* System Status Tab */}
            <TabsContent value="status" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">System Status</h2>
                
                <div className="space-y-6">
                  {/* Overall Status */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">All Systems Operational</h3>
                          <p className="text-muted-foreground">All services are running normally</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-600 font-medium">Operational</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Service Status */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Service Status</h3>
                    
                    {[
                      { name: "Website", status: "operational", uptime: "99.9%" },
                      { name: "API Services", status: "operational", uptime: "99.8%" },
                      { name: "Payment Processing", status: "operational", uptime: "99.9%" },
                      { name: "Email Services", status: "operational", uptime: "99.7%" },
                      { name: "Database", status: "operational", uptime: "99.9%" }
                    ].map((service, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {service.status === "operational" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-red-500" />
                              )}
                              <div>
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                              </div>
                            </div>
                            <Badge variant={service.status === "operational" ? "default" : "destructive"}>
                              {service.status === "operational" ? "Operational" : "Issues"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Incidents */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Recent Incidents</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center py-8">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold mb-2">No Recent Incidents</h4>
                          <p className="text-muted-foreground">All systems have been running smoothly for the past 30 days</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}