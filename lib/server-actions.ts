"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiPost } from "./api";
import {
  setAuthToken,
  removeAuthToken,
  loginWithTestCredentials,
} from "./auth";

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

  try {
    // Try backend authentication first
    const response = await apiPost<{ access_token: string; user: any }>(
      "/auth/login",
      {
        email,
        password,
      }
    );

    await setAuthToken(response.access_token);
    redirect("/admin");
  } catch (error) {
    // Fallback to test credentials if backend fails
    const testLogin = await loginWithTestCredentials(email, password);
    if (testLogin.success) {
      redirect("/admin");
    } else {
      throw new Error("Invalid credentials");
    }
  }
}

export async function logoutAction() {
  await removeAuthToken();
  redirect("/admin/login");
}

export async function createBookingAction(formData: FormData) {
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

  try {
    await apiPost("/bookings", bookingData);
    revalidatePath("/bookings");
    return {
      success: true,
      message:
        "Booking request submitted successfully! We'll confirm your reservation within 2 hours during business hours.",
    };
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return {
      success: false,
      message:
        error.message ||
        "Failed to create booking. Please try again or call us directly.",
    };
  }
}

export async function submitContactAction(formData: FormData) {
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

  try {
    await apiPost("/contact", contactData);
    revalidatePath("/admin/contact");
    return {
      success: true,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
    };
  } catch (error: any) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message:
        error.message ||
        "Failed to send message. Please try again or call us directly.",
    };
  }
}

// Review submission action
export async function submitReviewAction(formData: FormData) {
  const reviewData = {
    customer_name: formData.get("customer_name") as string,
    customer_email: formData.get("customer_email") as string,
    rating: Number.parseInt(formData.get("rating") as string),
    comment: formData.get("comment") as string,
  };

  try {
    await apiPost("/reviews", reviewData);
    return { success: true, message: "Thank you for your review!" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    };
  }
}
