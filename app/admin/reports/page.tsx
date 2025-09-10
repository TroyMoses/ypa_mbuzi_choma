"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Calendar,
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

interface ReportData {
  bookings: {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    monthlyData: Array<{ month: string; bookings: number }>;
    partySize: Array<{ size: string; count: number }>;
  };
  contacts: {
    total: number;
    unread: number;
    resolved: number;
    monthlyData: Array<{ month: string; messages: number }>;
  };
  reviews: {
    total: number;
    averageRating: number;
    ratingDistribution: Array<{ rating: number; count: number }>;
  };
  revenue: {
    estimated: number;
    growth: number;
    monthlyData: Array<{ month: string; revenue: number }>;
  };
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("6months");

  useEffect(() => {
    fetchReportData();
  }, [timeRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API call
      const mockData: ReportData = {
        bookings: {
          total: 342,
          confirmed: 298,
          pending: 28,
          cancelled: 16,
          monthlyData: [
            { month: "Jan", bookings: 45 },
            { month: "Feb", bookings: 52 },
            { month: "Mar", bookings: 48 },
            { month: "Apr", bookings: 61 },
            { month: "May", bookings: 55 },
            { month: "Jun", bookings: 67 },
          ],
          partySize: [
            { size: "1-2", count: 89 },
            { size: "3-4", count: 156 },
            { size: "5-6", count: 67 },
            { size: "7+", count: 30 },
          ],
        },
        contacts: {
          total: 127,
          unread: 8,
          resolved: 119,
          monthlyData: [
            { month: "Jan", messages: 18 },
            { month: "Feb", messages: 22 },
            { month: "Mar", messages: 19 },
            { month: "Apr", messages: 25 },
            { month: "May", messages: 21 },
            { month: "Jun", messages: 22 },
          ],
        },
        reviews: {
          total: 89,
          averageRating: 4.6,
          ratingDistribution: [
            { rating: 5, count: 52 },
            { rating: 4, count: 28 },
            { rating: 3, count: 7 },
            { rating: 2, count: 2 },
            { rating: 1, count: 0 },
          ],
        },
        revenue: {
          estimated: 125000,
          growth: 12.5,
          monthlyData: [
            { month: "Jan", revenue: 18500 },
            { month: "Feb", revenue: 21200 },
            { month: "Mar", revenue: 19800 },
            { month: "Apr", revenue: 24100 },
            { month: "May", revenue: 22300 },
            { month: "Jun", revenue: 26800 },
          ],
        },
      };
      setReportData(mockData);
    } catch (error) {
      console.error("Failed to fetch report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#8B4513", "#D2691E", "#CD853F", "#DEB887", "#F4A460"];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!reportData) {
    return <div>Failed to load report data</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl font-[family-name:var(--font-space-grotesk)]">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your restaurant's performance and insights
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month" className="cursor-pointer">
              Last Month
            </SelectItem>
            <SelectItem value="3months" className="cursor-pointer">
              Last 3 Months
            </SelectItem>
            <SelectItem value="6months" className="cursor-pointer">
              Last 6 Months
            </SelectItem>
            <SelectItem value="1year" className="cursor-pointer">
              Last Year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold">
                  {reportData.bookings.total}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {reportData.bookings.confirmed} confirmed
              </Badge>
              <Badge variant="outline" className="text-xs">
                {reportData.bookings.pending} pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Contact Messages
                </p>
                <p className="text-2xl font-bold">
                  {reportData.contacts.total}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="destructive" className="text-xs">
                {reportData.contacts.unread} unread
              </Badge>
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
                <p className="text-2xl font-bold">
                  {reportData.reviews.averageRating}
                </p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {reportData.reviews.total} reviews
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Est. Revenue
                </p>
                <p className="text-2xl font-bold">
                  UGX {reportData.revenue.estimated.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              {reportData.revenue.growth > 0 ? (
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+{reportData.revenue.growth}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingDown className="h-3 w-3" />
                  <span className="text-xs">{reportData.revenue.growth}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.bookings.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8B4513" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Party Size Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Party Size Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.bookings.partySize}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ size, percent }) =>
                    `${size}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {reportData.bookings.partySize.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.revenue.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `UGX ${Number(value).toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B4513"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.reviews.ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#D2691E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
