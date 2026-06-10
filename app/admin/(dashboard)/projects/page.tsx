import { createProject, deleteProject } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/delete-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Projects</h1>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientType">Client Type</Label>
              <Input id="clientType" name="clientType" required placeholder="Textile Mill" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <select
                id="projectType"
                name="projectType"
                className="flex h-10 w-full rounded-md border border-slate-300 px-3 text-sm"
              >
                <option value="installation">Installation</option>
                <option value="repair">Repair</option>
                <option value="upgrade">Upgrade</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" name="summary" required rows={2} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="content">Full Content</Label>
              <Textarea id="content" name="content" rows={4} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="published" id="published" defaultChecked />
              <Label htmlFor="published">Published</Label>
            </div>
            <div>
              <Button type="submit">Add Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border-b border-slate-100 pb-4"
              >
                <div>
                  <p className="font-medium">{p.title}</p>
                  <div className="mt-1 flex gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {p.projectType}
                    </Badge>
                    <Badge variant={p.published ? "success" : "outline"}>
                      {p.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <DeleteButton action={deleteProject.bind(null, p.id)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
