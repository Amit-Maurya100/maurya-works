import Link from "next/link";
import { createCategory, createProduct, deleteProduct } from "@/app/actions/admin";
import { DeleteButton } from "@/components/admin/delete-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Products</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  name="type"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 text-sm"
                >
                  <option value="machinery">Machinery</option>
                  <option value="spare_part">Spare Part</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specs">Specs (JSON)</Label>
                <Textarea
                  id="specs"
                  name="specs"
                  rows={2}
                  placeholder='{"Spindles": "96-480"}'
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="featured" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="published" defaultChecked />
                  Published
                </label>
              </div>
              <Button type="submit">Add Product</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createCategory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="catName">Name</Label>
                <Input id="catName" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catDesc">Description</Label>
                <Textarea id="catDesc" name="description" rows={2} />
              </div>
              <Button type="submit" variant="secondary">
                Add Category
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium">{p.name}</td>
                    <td className="py-3 pr-4">{p.category.name}</td>
                    <td className="py-3 pr-4 capitalize">{p.type.replace("_", " ")}</td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-1">
                        {p.featured && <Badge variant="warning">Featured</Badge>}
                        <Badge variant={p.published ? "success" : "secondary"}>
                          {p.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={`/products/${p.category.slug}/${p.slug}`}
                            target="_blank"
                          >
                            View
                          </Link>
                        </Button>
                        <DeleteButton action={deleteProduct.bind(null, p.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
