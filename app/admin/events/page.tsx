"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  max_attendees: number;
  current_attendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  created_at: string;
}

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Traditional Cooking WorUGXop",
          description:
            "Learn the secrets of authentic mbuzi choma preparation from our head chef.",
          date: "2024-02-15",
          time: "18:00",
          location: "YPA Restaurant Kitchen",
          price: 2500,
          max_attendees: 20,
          current_attendees: 12,
          status: "upcoming",
          created_at: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          title: "Live Music Night",
          description:
            "Enjoy traditional Kenyan music while dining on our signature dishes.",
          date: "2024-02-20",
          time: "19:30",
          location: "Main Dining Area",
          price: 0,
          max_attendees: 100,
          current_attendees: 45,
          status: "upcoming",
          created_at: "2024-01-14T15:45:00Z",
        },
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEvent = async (formData: FormData) => {
    // Mock save - replace with actual API call
    console.log("Saving event:", Object.fromEntries(formData));
    setIsDialogOpen(false);
    setEditingEvent(null);
    fetchEvents();
  };

  const handleDeleteEvent = async (id: string) => {
    // Mock delete - replace with actual API call
    setEvents(events.filter((event) => event.id !== id));
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl font-[family-name:var(--font-space-grotesk)]">
            Events Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage restaurant events and special occasions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <form action={handleSaveEvent} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingEvent?.title}
                  placeholder="Event title"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingEvent?.description}
                  placeholder="Event description..."
                  rows={3}
                  className="cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={editingEvent?.date}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    defaultValue={editingEvent?.time}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={editingEvent?.location}
                  placeholder="Event location"
                  className="cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (UGX)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={editingEvent?.price}
                    placeholder="0"
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="max_attendees">Max Attendees</Label>
                  <Input
                    id="max_attendees"
                    name="max_attendees"
                    type="number"
                    defaultValue={editingEvent?.max_attendees}
                    placeholder="50"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <Button type="submit" className="cursor-pointer">
                {editingEvent ? "Update Event" : "Create Event"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
                        {event.title}
                      </CardTitle>
                      <Badge variant={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{event.description}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Price: UGX {event.price.toLocaleString()}</span>
                      <span>
                        Attendees: {event.current_attendees}/
                        {event.max_attendees}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingEvent(event);
                        setIsDialogOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
