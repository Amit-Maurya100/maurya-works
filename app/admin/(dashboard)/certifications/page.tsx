import { createCertification, deleteCertification } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";

export default async function AdminCertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Certifications</h1>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCertification} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="ISO 9001:2015" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuer</Label>
              <Input id="issuer" name="issuer" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="published" id="published" defaultChecked />
              <Label htmlFor="published">Published</Label>
            </div>
            <div>
              <Button type="submit">Add Certification</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Certifications ({certifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between border-b border-slate-100 pb-4"
              >
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-slate-500">{cert.issuer}</p>
                </div>
                <DeleteButton action={deleteCertification.bind(null, cert.id)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
