"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const heroSlides = [
    {
      image: "/african-restaurant-interior-warm-lighting-traditio.jpg",
      title: "About YPA Mbuzi Choma",
      subtitle:
        "Discover our story, values, and the passionate team behind Uganda's finest African cuisine",
    },
    {
      image: "/african-chef-portrait-professional.jpg",
      title: "Our Heritage",
      subtitle:
        "Preserving traditional African cooking methods and recipes passed down through generations",
    },
    {
      image: "/african-chef-grilling-meat-traditional-kitchen.jpg",
      title: "Authentic Excellence",
      subtitle:
        "Every dish tells a story of our rich culinary heritage and commitment to quality",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Flavors",
      description:
        "We preserve traditional African cooking methods and recipes passed down through generations.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Building connections through food, bringing people together around our table.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "Using only the finest ingredients and maintaining the highest standards in everything we do.",
    },
    {
      icon: Clock,
      title: "Time-Honored Traditions",
      description:
        "Respecting the art of slow cooking and traditional preparation methods.",
    },
  ];

  const team = [
    {
      name: "Chef Samuel Kiprotich",
      role: "Head Chef & Owner",
      image: "/african-chef-portrait-professional.jpg",
      description:
        "With over 15 years of experience in traditional African cuisine, Chef Samuel brings authentic flavors to every dish.",
    },
    {
      name: "Mary Wanjiku",
      role: "Restaurant Manager",
      image: "/african-woman-restaurant-manager-professional.jpg",
      description:
        "Mary ensures every guest receives exceptional service and has a memorable dining experience.",
    },
    {
      name: "John Mwangi",
      role: "Grill Master",
      image: "/african-man-grill-master-chef.jpg",
      description:
        "John's expertise in grilling techniques ensures our mbuzi choma is perfectly prepared every time.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroSlider slides={heroSlides} height="h-[60vh] sm:h-[70vh]" />

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 sm:mb-6 text-balance">
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-pretty">
                YPA Mbuzi Choma was born from a passion for authentic African
                cuisine and a desire to share the rich culinary traditions of
                Kenya with the world. Founded in 2014, our restaurant has become
                a beloved destination for those seeking genuine flavors and warm
                hospitality.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-pretty">
                Our name "YPA" stands for "Young Professional Africans,"
                reflecting our commitment to celebrating African culture while
                embracing modern dining experiences. We believe that food is
                more than sustenance—it's a bridge that connects cultures and
                creates lasting memories.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty">
                Every dish we serve tells a story of our heritage, from the
                carefully selected spices to the time-honored cooking techniques
                that have been perfected over generations.
              </p>
            </div>
            <div data-aos="fade-left">
              <img
                src="/african-restaurant-interior-warm-lighting-traditio.jpg"
                alt="Restaurant interior"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
            <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 text-balance">
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              These core values guide everything we do, from sourcing
              ingredients to serving our guests
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-4 sm:p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-0">
                  <value.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-lg sm:text-xl font-[family-name:var(--font-space-grotesk)] mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
            <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 text-balance">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              The passionate individuals who bring authentic African flavors to
              your table
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 sm:p-6 text-center">
                  <h3 className="font-semibold text-lg sm:text-xl font-[family-name:var(--font-space-grotesk)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {member.role}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="font-bold text-3xl sm:text-4xl font-[family-name:var(--font-space-grotesk)] mb-4 sm:mb-6 text-balance">
            Our Mission
          </h2>
          <p className="text-lg sm:text-xl max-w-4xl mx-auto text-pretty">
            To preserve and celebrate the rich culinary heritage of Africa while
            creating exceptional dining experiences that bring people together.
            We are committed to serving authentic, high-quality dishes that
            honor our traditions while embracing the future of African cuisine.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
