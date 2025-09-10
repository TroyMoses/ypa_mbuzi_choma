"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Search, Calendar, Clock, Users, Check, X, Eye } from "lucide-react";

// Mock data - in real app, this would come from API
const bookings = [
  {
    id: "1",
    customer_name: "John Doe",
    customer_email: "john@example.com",
    customer_phone: "+254 700 123 456",
    booking_date: "2024-01-15",
    booking_time: "7:00 PM",
    party_size: 4,
    special_requests: "Window table preferred",
    status: "pending",
    created_at: "2024-01-10T10:30:00Z",
  },
  {
    id: "2",
    customer_name: "Sarah Wilson",
    customer_email: "sarah@example.com",
    customer_phone: "+254 711 987 654",
    booking_date: "2024-01-15",
    booking_time: "8:30 PM",
    party_size: 2,
    special_requests: "Anniversary dinner",
    status: "confirmed",
    created_at: "2024-01-09T14:20:00Z",
  },
  {
    id: "3",
    customer_name: "Mike Johnson",
    customer_email: "mike@example.com",
    customer_phone: "+254 722 456 789",
    booking_date: "2024-01-16",
    booking_time: "6:00 PM",
    party_size: 6,
    special_requests: "Business dinner",
    status: "confirmed",
    created_at: "2024-01-08T16:45:00Z",
  },
  {
    id: "4",
    customer_name: "Alice Brown",
    customer_email: "alice@example.com",
    customer_phone: "+254 733 789 012",
    booking_date: "2024-01-14",
    booking_time: "7:30 PM",
    party_size: 3,
    special_requests: "",
    status: "cancelled",
    created_at: "2024-01-07T09:15:00Z",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Bookings Management"
        description="View and manage restaurant reservations"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 cursor-pointer"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 cursor-pointer">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All" className="cursor-pointer">
              All Status
            </SelectItem>
            <SelectItem value="pending" className="cursor-pointer">
              Pending
            </SelectItem>
            <SelectItem value="confirmed" className="cursor-pointer">
              Confirmed
            </SelectItem>
            <SelectItem value="cancelled" className="cursor-pointer">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
            All Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Date & Time</th>
                  <th className="text-left p-3 font-medium">Party Size</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.customer_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.customer_email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.customer_phone}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.booking_date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.booking_time}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.party_size} people</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={
                          statusColors[
                            booking.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedBooking(booking)}
                          className="cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {booking.status === "pending" && (
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Customer Name
                    </label>
                    <p className="text-sm">{selectedBooking.customer_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <p className="text-sm">{selectedBooking.customer_email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <p className="text-sm">{selectedBooking.customer_phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Party Size
                    </label>
                    <p className="text-sm">
                      {selectedBooking.party_size} people
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <p className="text-sm">{selectedBooking.booking_date}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Time
                    </label>
                    <p className="text-sm">{selectedBooking.booking_time}</p>
                  </div>
                </div>
                {selectedBooking.special_requests && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Special Requests
                    </label>
                    <p className="text-sm">
                      {selectedBooking.special_requests}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <Badge
                    className={
                      statusColors[
                        selectedBooking.status as keyof typeof statusColors
                      ]
                    }
                  >
                    {selectedBooking.status}
                  </Badge>
                </div>
                <div className="flex gap-2 pt-4">
                  {selectedBooking.status === "pending" && (
                    <>
                      <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
                        Confirm Booking
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer text-red-600 hover:text-red-700 bg-transparent"
                      >
                        Cancel Booking
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBooking(null)}
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
