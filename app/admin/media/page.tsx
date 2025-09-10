"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Upload, ImageIcon, Trash2, Eye, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploaded_at: string;
  alt_text?: string;
}

export default function MediaManagementPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API call
      const mockMedia: MediaItem[] = [
        {
          id: "1",
          filename: "grilled-goat-special.jpg",
          url: "/grilled-goat-meat-african-spices.jpg",
          size: 245760,
          type: "image/jpeg",
          uploaded_at: "2024-01-15T10:30:00Z",
          alt_text: "Grilled goat meat with African spices",
        },
        {
          id: "2",
          filename: "restaurant-interior.jpg",
          url: "/restaurant-interior-warm-lighting.jpg",
          size: 189440,
          type: "image/jpeg",
          uploaded_at: "2024-01-14T15:45:00Z",
          alt_text: "Restaurant interior with warm lighting",
        },
        {
          id: "3",
          filename: "chef-preparing-mbuzi.jpg",
          url: "/chef-preparing-traditional-mbuzi.jpg",
          size: 312320,
          type: "image/jpeg",
          uploaded_at: "2024-01-13T09:20:00Z",
          alt_text: "Chef preparing traditional mbuzi choma",
        },
      ];
      setMedia(mockMedia);
    } catch (error) {
      console.error("Failed to fetch media:", error);
      toast.error("Failed to load media files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFiles) return;

    try {
      setUploading(true);
      // Simulate upload - replace with actual upload logic
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Add uploaded files to media list (mock)
      const newMedia: MediaItem[] = Array.from(selectedFiles).map(
        (file, index) => ({
          id: `new-${Date.now()}-${index}`,
          filename: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
          type: file.type,
          uploaded_at: new Date().toISOString(),
          alt_text: "",
        })
      );

      setMedia((prev) => [...newMedia, ...prev]);
      setSelectedFiles(null);
      toast.success(`Successfully uploaded ${selectedFiles.length} file(s)`);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Simulate delete API call
      setMedia((prev) => prev.filter((item) => item.id !== id));
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete file. Please try again.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl font-[family-name:var(--font-space-grotesk)]">
            Media Management
          </h1>
          <p className="text-muted-foreground">
            Upload and manage images for your gallery and website
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Media
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="media-upload">Select Images</Label>
            <Input
              id="media-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(e.target.files)}
              className="cursor-pointer"
            />
          </div>
          {selectedFiles && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {selectedFiles.length} file(s) selected
              </p>
              <Button
                onClick={handleFileUpload}
                disabled={uploading}
                className="cursor-pointer"
              >
                {uploading ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Media Library ({media.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner className="h-8 w-8" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.alt_text || item.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {item.filename}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {item.type.split("/")[1].toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(item.size)}
                    </p>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer flex-1 bg-transparent"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{item.filename}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.alt_text || item.filename}
                              className="w-full rounded-lg"
                            />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <strong>Size:</strong>{" "}
                                {formatFileSize(item.size)}
                              </div>
                              <div>
                                <strong>Type:</strong> {item.type}
                              </div>
                              <div>
                                <strong>Uploaded:</strong>{" "}
                                {new Date(
                                  item.uploaded_at
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(item.url, "_blank")}
                        className="cursor-pointer"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
