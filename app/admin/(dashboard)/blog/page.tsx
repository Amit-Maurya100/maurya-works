import { createBlogPost, deleteBlogPost } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/delete-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createBlogPost} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" required rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown-style)</Label>
              <Textarea id="content" name="content" required rows={8} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="published" id="published" defaultChecked />
              <Label htmlFor="published">Published</Label>
            </div>
            <Button type="submit">Add Post</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between border-b border-slate-100 pb-4"
              >
                <div>
                  <p className="font-medium">{post.title}</p>
                  <Badge variant={post.published ? "success" : "outline"} className="mt-1">
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <DeleteButton action={deleteBlogPost.bind(null, post.id)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
