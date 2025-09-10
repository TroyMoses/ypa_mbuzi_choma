"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  height?: string;
}

export function HeroSlider({ slides, height = "h-screen" }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className={`relative ${height} flex items-center justify-center overflow-hidden`}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        data-aos="fade-up"
      >
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-space-grotesk)] mb-4 sm:mb-6 text-balance">
          {slides[currentSlide]?.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
          {slides[currentSlide]?.subtitle}
        </p>
        {(slides[currentSlide]?.primaryButton ||
          slides[currentSlide]?.secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {slides[currentSlide]?.primaryButton && (
              <Button
                size="lg"
                asChild
                className="cursor-pointer text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                <Link href={slides[currentSlide].primaryButton!.href}>
                  {slides[currentSlide].primaryButton!.text}
                </Link>
              </Button>
            )}
            {slides[currentSlide]?.secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="cursor-pointer text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href={slides[currentSlide].secondaryButton!.href}>
                  {slides[currentSlide].secondaryButton!.text}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
