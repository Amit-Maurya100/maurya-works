import { createIndustry, deleteIndustry } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";

export default async function AdminIndustriesPage() {
  const industries = await prisma.industry.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Industries</h1>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add Industry</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createIndustry} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required rows={3} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="published" id="published" defaultChecked />
              <Label htmlFor="published">Published</Label>
            </div>
            <Button type="submit">Add Industry</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Industries ({industries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="flex items-center justify-between border-b border-slate-100 pb-4"
              >
                <div>
                  <p className="font-medium">{ind.name}</p>
                  <p className="text-sm text-slate-500 line-clamp-1">{ind.description}</p>
                </div>
                <DeleteButton action={deleteIndustry.bind(null, ind.id)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
