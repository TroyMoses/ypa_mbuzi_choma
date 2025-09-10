"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Search, Mail, Phone, Eye, Check } from "lucide-react";

// Mock data - in real app, this would come from API
const contactMessages = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma@example.com",
    phone: "+254 700 111 222",
    subject: "Catering Services Inquiry",
    message:
      "Hi, I'm interested in your catering services for a corporate event. Could you please provide more information about your packages and pricing?",
    is_read: false,
    created_at: "2024-01-14T10:30:00Z",
  },
  {
    id: "2",
    name: "Robert Kimani",
    email: "robert@example.com",
    phone: "+254 711 333 444",
    subject: "Dietary Restrictions",
    message:
      "Do you have vegetarian options available? I have some dietary restrictions and would like to know what options you offer.",
    is_read: true,
    created_at: "2024-01-13T14:20:00Z",
  },
  {
    id: "3",
    name: "Grace Wanjiru",
    email: "grace@example.com",
    phone: "",
    subject: "Compliment",
    message:
      "I had dinner at your restaurant last week and it was absolutely amazing! The mbuzi choma was the best I've ever had. Thank you for the wonderful experience.",
    is_read: true,
    created_at: "2024-01-12T16:45:00Z",
  },
  {
    id: "4",
    name: "Peter Ochieng",
    email: "peter@example.com",
    phone: "+254 722 555 666",
    subject: "Private Event Booking",
    message:
      "I would like to book your restaurant for a private birthday party for about 30 people. What are your options and requirements for private events?",
    is_read: false,
    created_at: "2024-01-11T09:15:00Z",
  },
];

export default function ContactMessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRead, setFilterRead] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const filteredMessages = contactMessages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterRead === "All" ||
      (filterRead === "Unread" && !message.is_read) ||
      (filterRead === "Read" && message.is_read);
    return matchesSearch && matchesFilter;
  });

  const unreadCount = contactMessages.filter((m) => !m.is_read).length;

  return (
    <div className="p-6">
      <PageHeader
        title="Contact Messages"
        description={`Manage customer inquiries and messages (${unreadCount} unread)`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 cursor-pointer"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterRead === "All" ? "default" : "outline"}
            onClick={() => setFilterRead("All")}
            className="cursor-pointer"
          >
            All
          </Button>
          <Button
            variant={filterRead === "Unread" ? "default" : "outline"}
            onClick={() => setFilterRead("Unread")}
            className="cursor-pointer"
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filterRead === "Read" ? "default" : "outline"}
            onClick={() => setFilterRead("Read")}
            className="cursor-pointer"
          >
            Read
          </Button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              !message.is_read ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                      {message.name}
                    </h3>
                    {!message.is_read && <Badge variant="secondary">New</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{message.email}</span>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{message.phone}</span>
                      </div>
                    )}
                  </div>
                  <p className="font-medium text-primary mb-2">
                    {message.subject}
                  </p>
                  <p className="text-muted-foreground text-pretty line-clamp-2">
                    {message.message}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(message.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedMessage(message)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {!message.is_read && (
                      <Button size="sm" className="cursor-pointer">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No messages found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
                Message Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <p className="text-sm">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <p className="text-sm">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <p className="text-sm">{selectedMessage.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <p className="text-sm">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <p className="text-sm font-medium text-primary">
                    {selectedMessage.subject}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  {!selectedMessage.is_read && (
                    <Button className="cursor-pointer">Mark as Read</Button>
                  )}
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                  >
                    Reply via Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMessage(null)}
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
