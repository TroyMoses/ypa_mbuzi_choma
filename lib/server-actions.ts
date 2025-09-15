"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthData } from "./authtoken";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "https://ypa-mbuzi-choma-backend.onrender.com";

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/;
  return phoneRegex.test(phone);
}

function validateBookingDate(date: string): boolean {
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}

// Authentication actions
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email === "admin@ypambuzi.com" && password === "admin123") {
    redirect("/admin");
  }

  // If we reach here, authentication failed
  throw new Error("Invalid credentials");
}

export async function logoutAction() {
  redirect("/admin/login");
}

export async function createBookingAction(formData: FormData) {
  try {
    const authData = await getAuthData();
    if (!authData) {
      return { success: false, error: "Authentication required" };
    }

    const customer_name = formData.get("customer_name") as string;
    const customer_email = formData.get("customer_email") as string;
    const customer_phone = formData.get("customer_phone") as string;
    const booking_date = formData.get("booking_date") as string;
    const booking_time = formData.get("booking_time") as string;
    const party_size = formData.get("party_size") as string;
    const special_requests = formData.get("special_requests") as string;

    // Validation
    const errors: string[] = [];

    if (!customer_name || customer_name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    if (!customer_email || !validateEmail(customer_email)) {
      errors.push("Please enter a valid email address");
    }

    if (!customer_phone || !validatePhone(customer_phone)) {
      errors.push("Please enter a valid phone number");
    }

    if (!booking_date || !validateBookingDate(booking_date)) {
      errors.push("Please select a valid future date");
    }

    if (!booking_time) {
      errors.push("Please select a time");
    }

    if (
      !party_size ||
      Number.parseInt(party_size) < 1 ||
      Number.parseInt(party_size) > 12
    ) {
      errors.push("Party size must be between 1 and 12 people");
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: "Please fix the following errors:",
        errors,
      };
    }

    const bookingData = {
      customer_name: customer_name.trim(),
      customer_email: customer_email.toLowerCase().trim(),
      customer_phone: customer_phone.trim(),
      booking_date,
      booking_time,
      party_size: Number.parseInt(party_size),
      special_requests: special_requests?.trim() || "",
    };

    const response = await fetch(`${FASTAPI_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authData.token,
        role: authData.role,
        is_admin: authData.is_admin.toString(),
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.detail || `HTTP error! status: ${response.status}`,
      };
    }

    const booking = await response.json();
    revalidatePath("/bookings");
    return {
      success: true,
      booking,
      message:
        "Booking request submitted successfully! We'll confirm your reservation within 2 hours during business hours.",
    };
  } catch (error: unknown) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create booking",
    };
  }
}

export async function submitContactAction(formData: FormData) {
  try {

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validation
    const errors: string[] = [];

    if (!name || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    if (!email || !validateEmail(email)) {
      errors.push("Please enter a valid email address");
    }

    if (phone && !validatePhone(phone)) {
      errors.push("Please enter a valid phone number");
    }

    if (!subject || subject.trim().length < 3) {
      errors.push("Subject must be at least 3 characters long");
    }

    if (!message || message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long");
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: "Please fix the following errors:",
        errors,
      };
    }

    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || "",
      subject: subject.trim(),
      message: message.trim(),
    };

    const response = await fetch(`${FASTAPI_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.detail || `HTTP error! status: ${response.status}`,
      };
    }

    const contact = await response.json();
    revalidatePath("/admin/contact");
    return {
      success: true,
      contact,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
    };
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
}

export async function submitReviewAction(formData: FormData) {
  try {
    const authData = await getAuthData();
    if (!authData) {
      return { success: false, error: "Authentication required" };
    }

    const reviewData = {
      customer_name: formData.get("customer_name") as string,
      customer_email: formData.get("customer_email") as string,
      rating: Number.parseInt(formData.get("rating") as string),
      comment: formData.get("comment") as string,
    };

    const response = await fetch(`${FASTAPI_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: authData.token,
        role: authData.role,
        is_admin: authData.is_admin.toString(),
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.detail || `HTTP error! status: ${response.status}`,
      };
    }

    const review = await response.json();
    return { success: true, review, message: "Thank you for your review!" };
  } catch (error: unknown) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit review",
    };
  }
}
