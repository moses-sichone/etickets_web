"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  QrCode, 
  Download, 
  Share2, 
  Smartphone, 
  Printer,
  ExternalLink,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  User,
  CreditCard
} from "lucide-react";

interface TicketViewerProps {
  ticket: {
    id: string;
    eventName: string;
    venue: string;
    date: string;
    time: string;
    ticketType: string;
    price: number;
    status: "upcoming" | "used" | "cancelled";
    qrCode: string;
    bookingId: string;
    orderNumber: string;
    seat?: string;
    gate?: string;
    section?: string;
  };
  className?: string;
}

export function TicketViewer({ ticket, className = "" }: TicketViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: "bg-green-100 text-green-800 border-green-200",
      used: "bg-gray-100 text-gray-800 border-gray-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status as keyof typeof colors] || colors.upcoming;
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate PDF download
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a simple PDF download simulation
      const link = document.createElement('a');
      link.href = ticket.qrCode;
      link.download = `ticket-${ticket.bookingId}.png`;
      link.click();
      
      console.log("Ticket downloaded:", ticket.id);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddToWallet = () => {
    // Simulate adding to wallet
    console.log("Adding ticket to wallet:", ticket.id);
    alert("Ticket added to your digital wallet!");
  };

  const handleShare = () => {
    // Simulate sharing functionality
    if (navigator.share) {
      navigator.share({
        title: ticket.eventName,
        text: `I'm going to ${ticket.eventName} at ${ticket.venue}!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Ticket link copied to clipboard!");
    }
  };

  const TicketContent = ({ isDialog = false }: { isDialog?: boolean }) => (
    <div className={`bg-white ${isDialog ? '' : 'border-2 border-dashed border-gray-300'} rounded-lg p-6 ${isDialog ? 'max-w-md mx-auto' : ''}`}>
      {/* Ticket Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`font-bold ${isDialog ? 'text-xl' : 'text-lg'}`}>{ticket.eventName}</h3>
          <p className="text-muted-foreground">{ticket.venue}</p>
        </div>
        <Badge className={getStatusColor(ticket.status)}>
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </Badge>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(ticket.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{ticket.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{ticket.venue}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{ticket.ticketType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>{formatPrice(ticket.price)}</span>
          </div>
          {ticket.seat && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Seat:</span>
              <span>{ticket.seat}</span>
            </div>
          )}
        </div>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <img
            src={ticket.qrCode}
            alt="Ticket QR Code"
            className="w-48 h-48"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Scan this QR code at the venue entrance
        </p>
      </div>

      {/* Ticket Info */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Booking ID:</span>
          <span className="font-mono">{ticket.bookingId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Order Number:</span>
          <span className="font-mono">{ticket.orderNumber}</span>
        </div>
        {ticket.gate && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gate:</span>
            <span>{ticket.gate}</span>
          </div>
        )}
        {ticket.section && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Section:</span>
            <span>{ticket.section}</span>
          </div>
        )}
      </div>

      {/* Validity Notice */}
      {ticket.status === "upcoming" && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Valid Ticket</p>
              <p>This ticket is valid for entry on {formatDate(ticket.date)} at {ticket.time}.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Ticket Preview */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{ticket.eventName}</CardTitle>
              <CardDescription>{ticket.venue} • {formatDate(ticket.date)}</CardDescription>
            </div>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <TicketContent />
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  View QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{ticket.eventName}</DialogTitle>
                  <DialogDescription>
                    Your ticket for {ticket.venue} on {formatDate(ticket.date)}
                  </DialogDescription>
                </DialogHeader>
                <TicketContent isDialog={true} />
                
                {/* Fullscreen Actions */}
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <Button onClick={handleDownload} disabled={isDownloading}>
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" onClick={handleAddToWallet}>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Add to Wallet
                  </Button>
                  
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button size="sm" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </>
              )}
            </Button>
            
            <Button size="sm" variant="outline" onClick={handleAddToWallet}>
              <Smartphone className="h-4 w-4 mr-2" />
              Add to Wallet
            </Button>
            
            <Button size="sm" variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Quick Actions */}
      <div className="md:hidden mt-4 grid grid-cols-2 gap-2">
        <Button size="sm" onClick={handleDownload} disabled={isDownloading} className="w-full">
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
        <Button size="sm" variant="outline" onClick={handleAddToWallet} className="w-full">
          Add to Wallet
        </Button>
      </div>
    </div>
  );
}