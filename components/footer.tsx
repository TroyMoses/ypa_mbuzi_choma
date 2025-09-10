import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <div className="font-bold text-2xl font-[family-name:var(--font-space-grotesk)] text-primary">
              YPA Mbuzi Choma
            </div>
            <p className="text-muted-foreground text-pretty">
              Experience the finest mbuzi choma and authentic African cuisine in
              the heart of Uganda.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                href="/menu"
                className="cursor-pointer block text-muted-foreground hover:text-primary transition-colors"
              >
                Our Menu
              </Link>
              <Link
                href="/booking"
                className="cursor-pointer block text-muted-foreground hover:text-primary transition-colors"
              >
                Book a Table
              </Link>
              <Link
                href="/about"
                className="cursor-pointer block text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/gallery"
                className="cursor-pointer block text-muted-foreground hover:text-primary transition-colors"
              >
                Gallery
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@ypambuzi.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Rubaga Road, Uganda
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
              Opening Hours
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="text-foreground">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-foreground">12:00 PM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 YPA Mbuzi Choma Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
