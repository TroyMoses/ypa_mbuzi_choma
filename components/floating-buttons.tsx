"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+256762939942";
    const message = encodeURIComponent(
      "Hello! I would like to make a reservation at YPA Mbuzi Choma Restaurant."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* WhatsApp Button - Left Side */}
      <Button
        onClick={handleWhatsAppClick}
        className="fixed left-6 bottom-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </Button>

      {/* Scroll to Top Button - Right Side */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
          size="icon"
        >
          <ChevronUp className="h-6 w-6 text-white" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      )}
    </>
  );
}
