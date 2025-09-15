"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { Star, Users, Clock, Award } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const heroSlides = [
    {
      image: "/banner/1.jpg",
      title: "YPA Mbuzi Choma",
      subtitle:
        "Experience the finest grilled goat and authentic African cuisine in the heart of Uganda",
      primaryButton: { text: "View Menu", href: "/menu" },
      secondaryButton: { text: "Book Table", href: "/booking" },
    },
    {
      image: "/banner/3.jpg",
      title: "African Flavors",
      subtitle:
        "Traditional recipes passed down through generations, prepared with the finest local ingredients",
      primaryButton: { text: "Our Story", href: "/about" },
      secondaryButton: { text: "View Gallery", href: "/gallery" },
    },
    {
      image: "/home/1.jpg",
      title: "Master Chefs at Work",
      subtitle:
        "Watch our skilled chefs prepare your meal using traditional grilling techniques over open flames",
      primaryButton: { text: "Book Experience", href: "/booking" },
      secondaryButton: { text: "Contact Us", href: "/contact" },
    },
  ];

  const featuredDishes = [
    {
      id: "1",
      name: "Signature Mbuzi Choma",
      description:
        "Tender grilled goat meat marinated in traditional African spices",
      price: "UGX 25,000",
      image: "/banner/1.jpg",
    },
    {
      id: "2",
      name: "Nyama Choma Platter",
      description: "Mixed grill featuring goat, beef, and chicken with ugali",
      price: "UGX 18,000",
      image: "/banner/2.jpg",
    },
    {
      id: "3",
      name: "Goat Curry",
      description: "Slow-cooked goat in rich coconut curry sauce",
      price: "UGX 12,000",
      image: "/signature/4.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Wanjiku",
      rating: 5,
      comment:
        "The best mbuzi choma in Uganda! Authentic flavors and excellent service.",
    },
    {
      name: "John Mwangi",
      rating: 5,
      comment:
        "Amazing atmosphere and the meat is always perfectly grilled. Highly recommended!",
    },
    {
      name: "Grace Akinyi",
      rating: 5,
      comment:
        "A true taste of home. The spices and preparation are absolutely perfect.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 sm:mb-6 text-balance">
                Authentic African Flavors
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-pretty">
                At YPA Mbuzi Choma, we bring you the most authentic taste of
                traditional African cuisine. Our signature mbuzi choma (grilled
                goat) is prepared using time-honored techniques and the finest
                local spices.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 text-pretty">
                Every dish tells a story of our rich culinary heritage, from the
                smoky flavors of our open-fire grilling to the aromatic spice
                blends passed down through generations.
              </p>
              <Button asChild className="cursor-pointer">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div data-aos="fade-left">
              <Image
                height={500}
                width={500}
                src="/home/2.jpg"
                alt="Chef preparing mbuzi choma"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
            <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 text-balance">
              Our Signature Dishes
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover our most popular dishes, each prepared with the finest
              ingredients and traditional cooking methods
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredDishes.map((dish, index) => (
              <Link key={dish.id} href={`/menu/${dish.id}`}>
              <Card
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    height={300}
                    width={300}
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-lg sm:text-xl font-[family-name:var(--font-space-grotesk)] mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 text-pretty">
                    {dish.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base sm:text-lg text-primary">
                      {dish.price}
                    </span>
                    {/* <Button size="sm" className="cursor-pointer text-sm">
                      Order Now
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12" data-aos="fade-up">
            <Button asChild size="lg" className="cursor-pointer">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div data-aos="fade-up" data-aos-delay="0">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4" />
              <div className="font-bold text-2xl sm:text-3xl font-[family-name:var(--font-space-grotesk)] mb-1 sm:mb-2">
                5000+
              </div>
              <div className="text-sm sm:text-base text-primary-foreground/80">
                Happy Customers
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <Clock className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4" />
              <div className="font-bold text-2xl sm:text-3xl font-[family-name:var(--font-space-grotesk)] mb-1 sm:mb-2">
                10+
              </div>
              <div className="text-sm sm:text-base text-primary-foreground/80">
                Years Experience
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Award className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4" />
              <div className="font-bold text-2xl sm:text-3xl font-[family-name:var(--font-space-grotesk)] mb-1 sm:mb-2">
                15+
              </div>
              <div className="text-sm sm:text-base text-primary-foreground/80">
                Awards Won
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <Star className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4" />
              <div className="font-bold text-2xl sm:text-3xl font-[family-name:var(--font-space-grotesk)] mb-1 sm:mb-2">
                4.9
              </div>
              <div className="text-sm sm:text-base text-primary-foreground/80">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
            <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 text-balance">
              What Our Customers Say
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Don&apos;t just take our word for it - hear from our satisfied
              customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 text-pretty">
                    &quot;{testimonial.comment}&quot;
                  </p>
                  <div className="font-semibold text-sm sm:text-base">
                    {testimonial.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 sm:mb-6 text-balance">
            Ready for an Unforgettable Dining Experience?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty">
            Book your table today and taste the authentic flavors of Africa at
            YPA Mbuzi Choma
          </p>
          <Button
            size="lg"
            asChild
            className="cursor-pointer bg-white text-secondary hover:bg-white/90"
          >
            <Link href="/booking">Book Your Table Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
