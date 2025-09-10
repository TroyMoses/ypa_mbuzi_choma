import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Calendar, MessageSquare, Star, UtensilsCrossed } from "lucide-react";

// Mock data - in real app, this would come from API
const stats = [
  {
    title: "Total Bookings",
    value: "156",
    change: "+12%",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Menu Items",
    value: "24",
    change: "+2",
    icon: UtensilsCrossed,
    color: "text-green-600",
  },
  {
    title: "Reviews",
    value: "89",
    change: "+8",
    icon: Star,
    color: "text-yellow-600",
  },
  {
    title: "Messages",
    value: "12",
    change: "+3",
    icon: MessageSquare,
    color: "text-purple-600",
  },
];

const recentBookings = [
  {
    id: "1",
    customer: "John Doe",
    date: "2024-01-15",
    time: "7:00 PM",
    party: 4,
    status: "confirmed",
  },
  {
    id: "2",
    customer: "Sarah Wilson",
    date: "2024-01-15",
    time: "8:30 PM",
    party: 2,
    status: "pending",
  },
  {
    id: "3",
    customer: "Mike Johnson",
    date: "2024-01-16",
    time: "6:00 PM",
    party: 6,
    status: "confirmed",
  },
];

const recentReviews = [
  {
    id: "1",
    customer: "Alice Brown",
    rating: 5,
    comment: "Amazing mbuzi choma! Best in Uganda.",
    date: "2024-01-14",
  },
  {
    id: "2",
    customer: "David Lee",
    rating: 4,
    comment: "Great atmosphere and delicious food.",
    date: "2024-01-13",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening at YPA Mbuzi Choma today."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} at {booking.time} • {booking.party} people
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
              Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{review.customer}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {review.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
