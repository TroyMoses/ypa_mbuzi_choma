"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const branches = [
  {
    name: "Gomba Branch",
    location: "Gomba District, Central Uganda",
    description:
      "Our flagship location serving the heart of Gomba with authentic roasted goat meat and traditional Ugandan hospitality.",
    phone: "+256 700 123 456",
    hours: "10:00 AM - 10:00 PM",
    subdomain: "https://gomba.ypambuzichoma.com",
    image: "/restaurant-exterior-gomba-uganda.jpg",
  },
  {
    name: "Masaka Branch",
    location: "Masaka City, Central Uganda",
    description:
      "Located in the bustling city of Masaka, offering our signature dishes with modern dining experience.",
    phone: "+256 700 234 567",
    hours: "9:00 AM - 11:00 PM",
    subdomain: "https://masaka.ypambuzichoma.com",
    image: "/modern-restaurant-masaka-uganda.jpg",
  },
  {
    name: "Nansana Branch",
    location: "Nansana, Wakiso District",
    description:
      "Conveniently located in Nansana, serving the greater Kampala area with our delicious roasted goat specialties.",
    phone: "+256 700 345 678",
    hours: "10:00 AM - 10:00 PM",
    subdomain: "https://nansana.ypambuzichoma.com",
    image: "/restaurant-nansana-kampala-uganda.jpg",
  },
  {
    name: "Mbarara Branch",
    location: "Mbarara City, Western Uganda",
    description:
      "Our western Uganda location bringing the authentic taste of roasted goat meat to the pearl of Africa's west.",
    phone: "+256 700 456 789",
    hours: "10:00 AM - 10:00 PM",
    subdomain: "https://mbarara.ypambuzichoma.com",
    image: "/restaurant-mbarara-western-uganda.jpg",
  },
];

export default function BranchesPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const heroSlides = [
    {
      image: "/restaurant-exterior-gomba-uganda.jpg",
      title: "Our Branches Across Uganda",
      subtitle:
        "Experience the authentic taste of YPA Mbuzi Choma at any of our convenient locations",
      primaryButton: { text: "Find Nearest Branch", href: "#branches" },
      secondaryButton: { text: "Contact Us", href: "/contact" },
    },
    {
      image: "/modern-restaurant-masaka-uganda.jpg",
      title: "Authentic African Cuisine",
      subtitle:
        "Traditional recipes and modern dining experience across all our branch locations",
      primaryButton: { text: "View Menu", href: "/menu" },
      secondaryButton: { text: "Book Table", href: "/booking" },
    },
    {
      image: "/restaurant-nansana-kampala-uganda.jpg",
      title: "Serving Communities",
      subtitle:
        "From Gomba to Mbarara, bringing families together with delicious roasted goat specialties",
      primaryButton: { text: "Our Story", href: "/about" },
      secondaryButton: { text: "View Gallery", href: "/gallery" },
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroSlider slides={heroSlides} height="h-[70vh]" />

      {/* Branches Grid */}
      <section id="branches" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
            <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 text-balance">
              Visit Our Locations
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Each branch offers the same authentic taste with unique local
              hospitality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {branches.map((branch, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-video relative">
                  <Image
                    fill
                    src={branch.image || "/placeholder.svg"}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600 font-[family-name:var(--font-space-grotesk)]">
                    {branch.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {branch.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-pretty">
                    {branch.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button asChild className="flex-1 cursor-pointer">
                      <Link
                        href={branch.subdomain}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Site
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="cursor-pointer bg-transparent"
                    >
                      <Link href={`tel:${branch.phone}`}>Call Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-balance">
            Can&apos;t Find a Branch Near You?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            We&apos;re always expanding! Contact us to suggest a new location or
            inquire about franchise opportunities.
          </p>
          <Button size="lg" asChild className="cursor-pointer">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
