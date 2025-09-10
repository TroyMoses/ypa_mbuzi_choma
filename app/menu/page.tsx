"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const menuCategories = [
  "All",
  "Grilled Specialties",
  "Traditional Dishes",
  "Sides",
  "Beverages",
  "Desserts",
];

const menuItems = [
  {
    id: "1",
    name: "Signature Mbuzi Choma",
    description:
      "Tender grilled goat meat marinated in traditional African spices, served with ugali and sukuma wiki",
    price: 1200,
    category: "Grilled Specialties",
    image: "/grilled-goat-meat-african-spices.jpg",
    isPopular: true,
    isSpicy: true,
  },
  {
    id: "2",
    name: "Nyama Choma Platter",
    description:
      "Mixed grill featuring goat, beef, and chicken with traditional accompaniments",
    price: 1800,
    category: "Grilled Specialties",
    image: "/mixed-grill-platter-ugali-african.jpg",
    isPopular: true,
  },
  {
    id: "3",
    name: "Goat Curry",
    description:
      "Slow-cooked goat in rich coconut curry sauce with aromatic spices",
    price: 1000,
    category: "Traditional Dishes",
    image: "/goat-curry-coconut-sauce-african.jpg",
    isSpicy: true,
  },
  {
    id: "4",
    name: "Beef Stew (Mchuzi wa Nyama)",
    description:
      "Traditional beef stew cooked with tomatoes, onions, and local spices",
    price: 800,
    category: "Traditional Dishes",
    image: "/african-beef-stew-tomatoes.jpg",
  },
  {
    id: "5",
    name: "Grilled Tilapia",
    description: "Fresh tilapia grilled to perfection with lemon and herbs",
    price: 900,
    category: "Grilled Specialties",
    image: "/grilled-tilapia-fish-lemon-herbs.jpg",
  },
  {
    id: "6",
    name: "Ugali",
    description: "Traditional cornmeal staple, perfect with any main dish",
    price: 150,
    category: "Sides",
    image: "/ugali-cornmeal-african-staple.jpg",
  },
  {
    id: "7",
    name: "Sukuma Wiki",
    description: "Sautéed collard greens with onions and tomatoes",
    price: 200,
    category: "Sides",
    image: "/sukuma-wiki-collard-greens-african.jpg",
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const heroSlides = [
    {
      image: "/grilled-goat-meat-african-spices.jpg",
      title: "Our Menu",
      subtitle:
        "Discover our authentic African dishes, prepared with the finest ingredients and traditional cooking methods",
    },
    {
      image: "/mixed-grill-platter-ugali-african.jpg",
      title: "Signature Specialties",
      subtitle:
        "From tender mbuzi choma to rich curries, every dish tells a story of African culinary heritage",
    },
    {
      image: "/african-chef-grilling-meat-traditional-kitchen.jpg",
      title: "Traditional Cooking",
      subtitle:
        "Time-honored techniques and authentic spices create unforgettable flavors in every bite",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroSlider slides={heroSlides} height="h-[60vh] sm:h-[70vh]" />

      {/* Menu Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-6 sm:mb-8 space-y-4" data-aos="fade-up">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 cursor-pointer"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {menuCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer text-sm sm:text-base px-3 sm:px-4 py-2"
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {item.isPopular && (
                      <Badge className="bg-secondary text-secondary-foreground text-xs">
                        Popular
                      </Badge>
                    )}
                    {item.isSpicy && (
                      <Badge variant="destructive" className="text-xs">
                        Spicy
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg sm:text-xl font-[family-name:var(--font-space-grotesk)]">
                      {item.name}
                    </h3>
                    <span className="font-bold text-base sm:text-lg text-primary">
                      UGX {item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 text-pretty">
                    {item.description}
                  </p>
                  <Button className="w-full cursor-pointer text-sm sm:text-base">
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 sm:py-12" data-aos="fade-up">
              <p className="text-muted-foreground text-base sm:text-lg">
                No dishes found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
