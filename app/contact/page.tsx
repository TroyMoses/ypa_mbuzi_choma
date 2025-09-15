"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { submitContactAction } from "@/lib/server-actions";
import AOS from "aos";
import "aos/dist/aos.css";
import { SubmitButtonContact } from "@/components/submit-button-contact";

const initialState = null;

function submitContactReducer(
  prevState: unknown,
  formData: FormData
) {
  return submitContactAction(formData);
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactReducer, initialState);

  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setFormKey((prev) => prev + 1);
    } else if (state?.success === false) {
      toast.error(state.message);
      if (state.errors && state.errors.length > 0) {
        state.errors.forEach((error) => {
          toast.error(error);
        });
      }
    }
  }, [state]);

  const heroSlides = [
    {
      image: "/african-restaurant-interior-warm-lighting-traditio.jpg",
      title: "Contact Us",
      subtitle:
        "Get in touch with us for reservations, inquiries, or just to say hello",
    },
    {
      image: "/african-woman-restaurant-manager-professional.jpg",
      title: "We're Here to Help",
      subtitle:
        "Our friendly team is ready to assist you with any questions or special requests",
    },
    {
      image: "/african-chef-portrait-professional.jpg",
      title: "Visit Us Today",
      subtitle:
        "Located in the heart of Uganda, we're always ready to welcome you with warm hospitality",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 700 123 456", "+254 711 987 654"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@ypambuzi.com", "reservations@ypambuzi.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Rubaga Road", "Kampala, Uganda"],
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["Mon-Fri: 11:00 AM - 11:00 PM", "Sat-Sun: 10:00 AM - 12:00 AM"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroSlider slides={heroSlides} height="h-[60vh] sm:h-[70vh]" />

      {/* Contact Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div data-aos="fade-right">
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-space-grotesk)] text-lg sm:text-xl">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    key={formKey}
                    action={formAction}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your full name"
                          className="cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+254 700 000 000"
                        className="cursor-pointer"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="What is this regarding?"
                        className="cursor-pointer"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        className="cursor-pointer"
                      />
                    </div>
                    <SubmitButtonContact />
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6" data-aos="fade-left">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg font-[family-name:var(--font-space-grotesk)] mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-sm sm:text-base text-muted-foreground"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 sm:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8" data-aos="fade-up">
            <h2 className="font-bold text-2xl sm:text-3xl font-[family-name:var(--font-space-grotesk)] mb-4 text-balance">
              Find Us
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty">
              Located in the heart of Uganda, we&apos;re easy to find and always
              ready to welcome you
            </p>
          </div>
          <div
            className="aspect-video rounded-lg overflow-hidden shadow-lg"
            data-aos="fade-up"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.760297913102!2d32.560346773449176!3d0.3090007640402714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbd003f741d19%3A0x70190b213546d7e8!2sMbuzi%20Choma%20YPA!5e0!3m2!1sen!2sug!4v1757412952486!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="YPA Mbuzi Choma Restaurant Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
