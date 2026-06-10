import type { Metadata } from "next";
import Link from "next/link";
import { Factory } from "lucide-react";
import { CTABanner } from "@/components/layout/cta-banner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Products & Services",
  description: "Textile machinery, spare parts, and repair services for every production need.",
};

export default async function ProductsPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Products & Services</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Machinery, spare parts, and comprehensive repair services for the textile industry.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products/${cat.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <Factory className="h-10 w-10 text-amber-500" />
                    <CardTitle>{cat.name}</CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-600">
                      {cat._count.products} item{cat._count.products !== 1 ? "s" : ""} →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
