"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Search, Star, Check, X, Eye } from "lucide-react";

// Mock data - in real app, this would come from API
const reviews = [
  {
    id: "1",
    customer_name: "Alice Brown",
    customer_email: "alice@example.com",
    rating: 5,
    comment:
      "Amazing mbuzi choma! The meat was perfectly grilled and the spices were incredible. Best African restaurant in Uganda!",
    is_approved: true,
    created_at: "2024-01-14T10:30:00Z",
  },
  {
    id: "2",
    customer_name: "David Lee",
    customer_email: "david@example.com",
    rating: 4,
    comment:
      "Great atmosphere and delicious food. The service was excellent and the portions were generous. Will definitely come back!",
    is_approved: true,
    created_at: "2024-01-13T14:20:00Z",
  },
  {
    id: "3",
    customer_name: "Mary Njeri",
    customer_email: "mary@example.com",
    rating: 5,
    comment:
      "Authentic African flavors! The goat curry was outstanding and the staff was very friendly. Highly recommended!",
    is_approved: false,
    created_at: "2024-01-12T16:45:00Z",
  },
  {
    id: "4",
    customer_name: "James Wilson",
    customer_email: "james@example.com",
    rating: 3,
    comment:
      "Food was okay but service was a bit slow. The mbuzi choma was good but could use more seasoning.",
    is_approved: false,
    created_at: "2024-01-11T09:15:00Z",
  },
  {
    id: "5",
    customer_name: "Sarah Mwangi",
    customer_email: "sarah@example.com",
    rating: 5,
    comment:
      "Exceptional dining experience! The traditional preparation methods really show in the taste. Perfect for special occasions.",
    is_approved: true,
    created_at: "2024-01-10T18:30:00Z",
  },
];

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ||
      (filterStatus === "Approved" && review.is_approved) ||
      (filterStatus === "Pending" && !review.is_approved);
    return matchesSearch && matchesFilter;
  });

  const pendingCount = reviews.filter((r) => !r.is_approved).length;
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="p-6">
      <PageHeader
        title="Reviews Management"
        description={`Manage customer reviews and testimonials (${pendingCount} pending approval)`}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Reviews
                </p>
                <p className="text-2xl font-bold">{reviews.length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Rating
                </p>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Approval
                </p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {pendingCount}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 cursor-pointer"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "All" ? "default" : "outline"}
            onClick={() => setFilterStatus("All")}
            className="cursor-pointer"
          >
            All
          </Button>
          <Button
            variant={filterStatus === "Approved" ? "default" : "outline"}
            onClick={() => setFilterStatus("Approved")}
            className="cursor-pointer"
          >
            Approved
          </Button>
          <Button
            variant={filterStatus === "Pending" ? "default" : "outline"}
            onClick={() => setFilterStatus("Pending")}
            className="cursor-pointer"
          >
            Pending ({pendingCount})
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card
            key={review.id}
            className={`${
              !review.is_approved ? "border-l-4 border-l-yellow-500" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                      {review.customer_name}
                    </h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <Badge
                      variant={review.is_approved ? "default" : "secondary"}
                    >
                      {review.is_approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {review.customer_email}
                  </p>
                  <p className="text-muted-foreground text-pretty">
                    {review.comment}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedReview(review)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {!review.is_approved && (
                      <>
                        <Button
                          size="sm"
                          className="cursor-pointer bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="cursor-pointer text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No reviews found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
                Review Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Customer Name
                    </label>
                    <p className="text-sm">{selectedReview.customer_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <p className="text-sm">{selectedReview.customer_email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rating
                    </label>
                    <div className="flex">
                      {[...Array(selectedReview.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <p className="text-sm">
                      {new Date(selectedReview.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Review
                  </label>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">{selectedReview.comment}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <Badge
                    variant={
                      selectedReview.is_approved ? "default" : "secondary"
                    }
                  >
                    {selectedReview.is_approved
                      ? "Approved"
                      : "Pending Approval"}
                  </Badge>
                </div>
                <div className="flex gap-2 pt-4">
                  {!selectedReview.is_approved && (
                    <>
                      <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
                        Approve Review
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer text-red-600 hover:text-red-700 bg-transparent"
                      >
                        Reject Review
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedReview(null)}
                    className="cursor-pointer"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
