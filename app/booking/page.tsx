"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Calendar, Clock, Users } from "lucide-react";
import { createBookingAction } from "@/lib/server-actions";
import AOS from "aos";
import "aos/dist/aos.css";

const initialState = null;

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
      {pending ? (
        <>
          <LoadingSpinner className="mr-2 h-4 w-4" />
          Processing...
        </>
      ) : (
        "Reserve Table"
      )}
    </Button>
  );
}

function createBookingReducer(
  prevState: unknown,
  formData: FormData
) {
  return createBookingAction(formData);
}

export default function BookingPage() {
  const [state, formAction] = useFormState(createBookingReducer, initialState);
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
      title: "Book Your Table",
      subtitle:
        "Reserve your spot for an unforgettable dining experience at YPA Mbuzi Choma",
    },
    {
      image: "/grilled-goat-meat-african-spices.jpg",
      title: "Authentic Dining Experience",
      subtitle:
        "Secure your table and prepare for a journey through traditional African flavors",
    },
    {
      image: "/african-restaurant-grilled-meat-fire.jpg",
      title: "Perfect for Every Occasion",
      subtitle:
        "Whether it's a romantic dinner or family celebration, we'll make it memorable",
    },
  ];

  const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
  ];

  const partySizes = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroSlider slides={heroSlides} height="h-[60vh] sm:h-[70vh]" />

      {/* Booking Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card data-aos="fade-up">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-space-grotesk)] text-center text-lg sm:text-xl">
                  Make a Reservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  key={formKey}
                  action={formAction}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base sm:text-lg font-[family-name:var(--font-space-grotesk)]">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="customer_name"
                          className="block text-sm font-medium mb-2"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="customer_name"
                          name="customer_name"
                          required
                          placeholder="Your full name"
                          className="cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="customer_email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="customer_email"
                          name="customer_email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="customer_phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone Number *
                      </label>
                      <Input
                        id="customer_phone"
                        name="customer_phone"
                        type="tel"
                        required
                        placeholder="+254 700 000 000"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base sm:text-lg font-[family-name:var(--font-space-grotesk)]">
                      Reservation Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="booking_date"
                          className="block text-sm font-medium mb-2"
                        >
                          <Calendar className="inline h-4 w-4 mr-1" />
                          Date *
                        </label>
                        <Input
                          id="booking_date"
                          name="booking_date"
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="booking_time"
                          className="block text-sm font-medium mb-2"
                        >
                          <Clock className="inline h-4 w-4 mr-1" />
                          Time *
                        </label>
                        <Select name="booking_time" required>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem
                                key={time}
                                value={time}
                                className="cursor-pointer"
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor="party_size"
                          className="block text-sm font-medium mb-2"
                        >
                          <Users className="inline h-4 w-4 mr-1" />
                          Party Size *
                        </label>
                        <Select name="party_size" required>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {partySizes.map((size) => (
                              <SelectItem
                                key={size}
                                value={size.toString()}
                                className="cursor-pointer"
                              >
                                {size} {size === 1 ? "person" : "people"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label
                      htmlFor="special_requests"
                      className="block text-sm font-medium mb-2"
                    >
                      Special Requests
                    </label>
                    <Textarea
                      id="special_requests"
                      name="special_requests"
                      rows={4}
                      placeholder="Any dietary restrictions, special occasions, or other requests..."
                      className="cursor-pointer"
                    />
                  </div>

                  <SubmitButton pending={false} />
                </form>
              </CardContent>
            </Card>

            {/* Booking Information */}
            <div
              className="mt-6 sm:mt-8 space-y-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg font-[family-name:var(--font-space-grotesk)] mb-4">
                    Booking Information
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                    <li>
                      • Reservations are confirmed within 2 hours during
                      business hours
                    </li>
                    <li>
                      • Tables are held for 15 minutes past reservation time
                    </li>
                    <li>• For parties of 8 or more, please call us directly</li>
                    <li>
                      • Cancellations can be made up to 2 hours before your
                      reservation
                    </li>
                    <li>
                      • We accommodate dietary restrictions with advance notice
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
