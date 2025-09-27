import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    explore: [
      { name: "Venues", href: "/venues" },
      { name: "Events", href: "/events" },
      { name: "Event Planners", href: "/planners" },
      { name: "Categories", href: "/categories" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Live Chat", href: "/chat" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/tickethub", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/tickethub", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/tickethub", icon: Instagram },
  ];

  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <img
                  src="/logo.svg"
                  alt="TicketHub"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl">TicketHub</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover and book amazing venues and events. Your perfect experience is just a click away.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  support@tickethub.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  123 Event Street, City, ST 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 TicketHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/accessibility"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessibility
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}