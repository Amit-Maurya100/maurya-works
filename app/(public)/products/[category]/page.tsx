import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { published: true },
        orderBy: { name: "asc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="text-sm text-amber-400 hover:underline">
            ← All Products
          </Link>
          <h1 className="mt-4 text-4xl font-bold">{category.name}</h1>
          {category.description && (
            <p className="mt-4 max-w-2xl text-slate-300">{category.description}</p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {category.products.length === 0 ? (
            <p className="text-center text-slate-500">No products in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${category.slug}/${product.slug}`}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <div className="flex h-36 items-center justify-center bg-slate-100">
                      <Cog className="h-14 w-14 text-slate-300" />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit capitalize">
                        {product.type.replace("_", " ")}
                      </Badge>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
