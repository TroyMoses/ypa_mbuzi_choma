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
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
  author: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "The Art of Mbuzi Choma: A Culinary Journey",
          content:
            "Discover the rich tradition behind our signature grilled goat...",
          excerpt:
            "Discover the rich tradition behind our signature grilled goat dish and the authentic spices that make it special.",
          status: "published",
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-15T10:30:00Z",
          author: "Chef Kamau",
        },
        {
          id: "2",
          title: "New Menu Items Coming This Month",
          content: "We're excited to introduce new dishes to our menu...",
          excerpt:
            "We're excited to introduce new dishes to our menu, featuring seasonal ingredients and traditional recipes.",
          status: "draft",
          created_at: "2024-01-14T15:45:00Z",
          updated_at: "2024-01-14T15:45:00Z",
          author: "Admin",
        },
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (formData: FormData) => {
    // Mock save - replace with actual API call
    console.log("Saving post:", Object.fromEntries(formData));
    setIsDialogOpen(false);
    setEditingPost(null);
    fetchPosts();
  };

  const handleDeletePost = async (id: string) => {
    // Mock delete - replace with actual API call
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl font-[family-name:var(--font-space-grotesk)]">
            Blog Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage blog posts and news articles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "Create New Post"}
              </DialogTitle>
            </DialogHeader>
            <form action={handleSavePost} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingPost?.title}
                  placeholder="Post title"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={editingPost?.excerpt}
                  placeholder="Brief description..."
                  rows={2}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={editingPost?.content}
                  placeholder="Post content..."
                  rows={8}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  name="status"
                  value="published"
                  className="cursor-pointer"
                >
                  Publish
                </Button>
                <Button
                  type="submit"
                  name="status"
                  value="draft"
                  variant="outline"
                  className="cursor-pointer bg-transparent"
                >
                  Save as Draft
                </Button>
              </div>
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
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <span>By {post.author}</span>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer bg-transparent"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingPost(post);
                        setIsDialogOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePost(post.id)}
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
