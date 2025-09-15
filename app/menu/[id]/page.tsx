"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, StarIcon } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { submitReviewAction } from "@/lib/server-actions";
import { toast } from "sonner";

// Mock data - same as in menu page but with additional images for gallery
const menuItems = [
  {
    id: "1",
    name: "Signature Mbuzi Choma",
    description:
      "Tender grilled goat meat marinated in traditional African spices, served with ugali and sukuma wiki",
    fullDescription:
      "Our signature dish features premium goat meat, carefully selected and marinated for 24 hours in a blend of traditional African spices including coriander, cumin, ginger, and garlic. The meat is then grilled over an open flame to achieve the perfect char while maintaining its tender, juicy interior. Served with freshly prepared ugali (cornmeal staple) and sukuma wiki (collard greens sautéed with onions and tomatoes).",
    price: 25000,
    category: "Grilled Specialties",
    image: "/banner/1.jpg",
    gallery: ["/banner/1.jpg"],
    isPopular: true,
    isSpicy: true,
    ingredients: [
      "Goat meat",
      "Traditional spices",
      "Ugali",
      "Sukuma wiki",
      "Onions",
      "Tomatoes",
    ],
    nutritionInfo: {
      calories: 450,
      protein: "35g",
      carbs: "25g",
      fat: "22g",
    },
  },
  {
    id: "2",
    name: "Nyama Choma Platter",
    description:
      "Mixed grill featuring goat, beef, and chicken with traditional accompaniments",
    fullDescription:
      "A generous platter perfect for sharing, featuring our finest cuts of goat, beef, and chicken, all grilled to perfection. Each meat is seasoned with its own unique blend of spices to bring out the best flavors. Accompanied by ugali, rice, and a selection of traditional vegetables.",
    price: 18000,
    category: "Grilled Specialties",
    image: "/banner/2.jpg",
    gallery: ["/banner/2.jpg"],
    isPopular: true,
    ingredients: [
      "Goat meat",
      "Beef",
      "Chicken",
      "Mixed spices",
      "Ugali",
      "Rice",
      "Vegetables",
    ],
    nutritionInfo: {
      calories: 650,
      protein: "45g",
      carbs: "35g",
      fat: "32g",
    },
  },
  {
    id: "3",
    name: "Goat Curry",
    description:
      "Slow-cooked goat in rich coconut curry sauce with aromatic spices",
    fullDescription:
      "A rich and flavorful curry made with tender goat meat slow-cooked in coconut milk and a carefully balanced blend of aromatic spices. The dish is simmered for hours to allow the flavors to meld perfectly, creating a creamy, spicy sauce that pairs beautifully with rice or chapati.",
    price: 1000,
    category: "Traditional Dishes",
    image: "/signature/4.jpg",
    gallery: ["/signature/4.jpg"],
    isSpicy: true,
    ingredients: [
      "Goat meat",
      "Coconut milk",
      "Curry spices",
      "Onions",
      "Tomatoes",
      "Ginger",
      "Garlic",
    ],
    nutritionInfo: {
      calories: 380,
      protein: "28g",
      carbs: "15g",
      fat: "25g",
    },
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    customerName: "John Doe",
    rating: 5,
    comment:
      "Absolutely delicious! The meat was perfectly grilled and the spices were amazing.",
    date: "2024-01-15",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    rating: 4,
    comment: "Great authentic flavors. Will definitely come back for more!",
    date: "2024-01-10",
  },
  {
    id: "3",
    customerName: "Michael Brown",
    rating: 5,
    comment:
      "Best African cuisine in town. The atmosphere and food are both excellent.",
    date: "2024-01-08",
  },
];

export default function MenuItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({
    customerName: "",
    customerEmail: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const menuItem = menuItems.find((item) => item.id === params.id);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  if (!menuItem) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Menu Item Not Found</h1>
          <Button onClick={() => router.push("/menu")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newReview.customerName ||
      !newReview.customerEmail ||
      !newReview.comment
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("customer_name", newReview.customerName);
      formData.append("customer_email", newReview.customerEmail);
      formData.append("rating", newReview.rating.toString());
      formData.append("comment", newReview.comment);

      // Pass menu ID from URL params
      const result = await submitReviewAction(formData, params.id as string);

      if (result.success) {
        toast.success(result.message);
        // Add review to local state for immediate UI update
        const review = {
          id: Date.now().toString(),
          customerName: newReview.customerName,
          rating: newReview.rating,
          comment: newReview.comment,
          date: new Date().toISOString().split("T")[0],
        };
        setReviews([review, ...reviews]);
        setNewReview({
          customerName: "",
          customerEmail: "",
          rating: 5,
          comment: "",
        });
      } else {
        toast.error(result.error || "Failed to submit review");
        if (result.errors) {
          result.errors.forEach((error: string) => toast.error(error));
        }
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.push("/menu")}
          className="mb-6"
          data-aos="fade-right"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4" data-aos="fade-right">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                height={400}
                width={500}
                src={menuItem.gallery[selectedImage] || "/placeholder.svg"}
                alt={menuItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {menuItem.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    height={100}
                    width={100}
                    src={image || "/placeholder.svg"}
                    alt={`${menuItem.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6" data-aos="fade-left">
            <div>
              <div className="flex gap-2 mb-2">
                {menuItem.isPopular && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Popular
                  </Badge>
                )}
                {menuItem.isSpicy && <Badge variant="destructive">Spicy</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">
                {menuItem.name}
              </h1>
              <p className="text-2xl font-bold text-primary mb-4">
                UGX {menuItem.price.toLocaleString()}
              </p>
              <p className="text-muted-foreground mb-4">
                {menuItem.fullDescription}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {menuItem.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Nutrition Info */}
            <div>
              <h3 className="font-semibold mb-2">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Calories: {menuItem.nutritionInfo.calories}</div>
                <div>Protein: {menuItem.nutritionInfo.protein}</div>
                <div>Carbs: {menuItem.nutritionInfo.carbs}</div>
                <div>Fat: {menuItem.nutritionInfo.fat}</div>
              </div>
            </div>

            {/* <Button size="lg" className="w-full">
              Add to Order - UGX {menuItem.price.toLocaleString()}
            </Button> */}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>

          {/* Submit Review Form */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Your Name *</Label>
                    <Input
                      id="customerName"
                      value={newReview.customerName}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          customerName: e.target.value,
                        })
                      }
                      placeholder="Enter your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Your Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={newReview.customerEmail}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          customerEmail: e.target.value,
                        })
                      }
                      placeholder="Enter your email"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <select
                    id="rating"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    disabled={isSubmitting}
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="comment">Your Review *</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Share your experience with this dish..."
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{review.customerName}</h4>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
