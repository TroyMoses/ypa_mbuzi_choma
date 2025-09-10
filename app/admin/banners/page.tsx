"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  link_url: string;
  link_text: string;
  is_active: boolean;
  position: number;
  created_at: string;
}

export default function BannersManagementPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockBanners: Banner[] = [
        {
          id: "1",
          title: "Welcome to YPA Mbuzi Choma",
          subtitle: "Authentic African Cuisine",
          description:
            "Experience the finest grilled goat meat with traditional spices and warm hospitality.",
          image_url: "/grilled-goat-meat-african-spices.jpg",
          link_url: "/menu",
          link_text: "View Menu",
          is_active: true,
          position: 1,
          created_at: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          title: "Book Your Table Today",
          subtitle: "Reserve Your Experience",
          description:
            "Don't miss out on our signature dishes. Book your table for an unforgettable dining experience.",
          image_url: "/restaurant-interior-warm-lighting.jpg",
          link_url: "/booking",
          link_text: "Book Now",
          is_active: true,
          position: 2,
          created_at: "2024-01-14T15:45:00Z",
        },
      ];
      setBanners(mockBanners);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBanner = async (formData: FormData) => {
    // Mock save - replace with actual API call
    console.log("Saving banner:", Object.fromEntries(formData));
    setIsDialogOpen(false);
    setEditingBanner(null);
    fetchBanners();
  };

  const handleDeleteBanner = async (id: string) => {
    // Mock delete - replace with actual API call
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    // Mock toggle - replace with actual API call
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, is_active: isActive } : banner
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl font-[family-name:var(--font-space-grotesk)]">
            Banner Management
          </h1>
          <p className="text-muted-foreground">
            Manage homepage banners and promotional content
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              New Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Edit Banner" : "Create New Banner"}
              </DialogTitle>
            </DialogHeader>
            <form action={handleSaveBanner} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingBanner?.title}
                  placeholder="Banner title"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  defaultValue={editingBanner?.subtitle}
                  placeholder="Banner subtitle"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingBanner?.description}
                  placeholder="Banner description..."
                  rows={3}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  defaultValue={editingBanner?.image_url}
                  placeholder="/path/to/image.jpg"
                  className="cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link_url">Link URL</Label>
                  <Input
                    id="link_url"
                    name="link_url"
                    defaultValue={editingBanner?.link_url}
                    placeholder="/menu"
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="link_text">Link Text</Label>
                  <Input
                    id="link_text"
                    name="link_text"
                    defaultValue={editingBanner?.link_text}
                    placeholder="View Menu"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  type="number"
                  defaultValue={editingBanner?.position}
                  placeholder="1"
                  className="cursor-pointer"
                />
              </div>
              <Button type="submit" className="cursor-pointer">
                {editingBanner ? "Update Banner" : "Create Banner"}
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
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={banner.image_url || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                        {banner.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={banner.is_active ? "default" : "secondary"}
                        >
                          {banner.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          Position {banner.position}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {banner.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {banner.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={banner.is_active}
                            onCheckedChange={(checked) =>
                              handleToggleActive(banner.id, checked)
                            }
                          />
                          <span className="text-sm">Active</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Link: {banner.link_text} → {banner.link_url}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingBanner(banner);
                            setIsDialogOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
