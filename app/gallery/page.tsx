"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

const galleryCategories = ["All", "Food", "Restaurant", "Events", "Team"];

const galleryImages = [
  {
    id: "1",
    src: "/grilled-goat-meat-mbuzi-choma-african-spices.jpg",
    alt: "Signature Mbuzi Choma",
    category: "Food",
  },
  {
    id: "2",
    src: "/african-restaurant-interior-warm-lighting-traditio.jpg",
    alt: "Restaurant Interior",
    category: "Restaurant",
  },
  {
    id: "3",
    src: "/mixed-grill-platter-ugali-african.jpg",
    alt: "Mixed Grill Platter",
    category: "Food",
  },
  {
    id: "4",
    src: "/african-chef-portrait-professional.jpg",
    alt: "Chef at Work",
    category: "Team",
  },
  {
    id: "5",
    src: "/african-restaurant-grilled-meat-fire.jpg",
    alt: "Dining Experience",
    category: "Restaurant",
  },
  {
    id: "6",
    src: "/goat-curry-coconut-sauce-african.jpg",
    alt: "Goat Curry",
    category: "Food",
  },
  {
    id: "7",
    src: "/african-chef-grilling-meat-traditional-kitchen.jpg",
    alt: "Live Music Night",
    category: "Events",
  },
  {
    id: "8",
    src: "/grilled-tilapia-fish-lemon-herbs.jpg",
    alt: "Grilled Tilapia",
    category: "Food",
  },
  {
    id: "9",
    src: "/african-man-grill-master-chef.jpg",
    alt: "Kitchen Team",
    category: "Team",
  },
  {
    id: "10",
    src: "/african-restaurant-interior-warm-lighting-traditio.jpg",
    alt: "Outdoor Terrace",
    category: "Restaurant",
  },
  {
    id: "11",
    src: "/ugali-cornmeal-african-staple.jpg",
    alt: "Traditional Sides",
    category: "Food",
  },
  {
    id: "12",
    src: "/african-woman-restaurant-manager-professional.jpg",
    alt: "Cultural Celebration",
    category: "Events",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const heroSlides = [
    {
      image: "/african-restaurant-interior-warm-lighting-traditio.jpg",
      title: "Gallery",
      subtitle:
        "Take a visual journey through our restaurant, dishes, and memorable moments",
    },
    {
      image: "/grilled-goat-meat-mbuzi-choma-african-spices.jpg",
      title: "Culinary Artistry",
      subtitle:
        "Every dish is a masterpiece, crafted with passion and traditional techniques",
    },
    {
      image: "/african-chef-grilling-meat-traditional-kitchen.jpg",
      title: "Behind the Scenes",
      subtitle:
        "Meet our talented team and see the dedication that goes into every meal",
    },
  ];

  const filteredImages = galleryImages.filter(
    (image) => selectedCategory === "All" || image.category === selectedCategory
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroSlider slides={heroSlides} height="h-[60vh] sm:h-[70vh]" />

      {/* Gallery Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8"
            data-aos="fade-up"
          >
            {galleryCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer text-sm sm:text-base px-3 sm:px-4 py-2"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-8 sm:py-12" data-aos="fade-up">
              <p className="text-muted-foreground text-base sm:text-lg">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors cursor-pointer"
              aria-label="Close image"
            >
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
