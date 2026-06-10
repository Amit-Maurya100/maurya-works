import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cog } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, category: { slug: catSlug } },
  });
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { category: catSlug, slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, published: true, category: { slug: catSlug } },
    include: { category: true },
  });

  if (!product) notFound();

  const specs = product.specs as Record<string, string> | null;

  return (
    <>
      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/products/${product.category.slug}`}
            className="text-sm text-amber-400 hover:underline"
          >
            ← {product.category.name}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <Badge variant="warning" className="capitalize">
              {product.type.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex h-72 items-center justify-center rounded-lg bg-slate-100">
                <Cog className="h-24 w-24 text-slate-300" />
              </div>
              <p className="mt-6 text-slate-600 leading-relaxed">{product.description}</p>

              {specs && Object.keys(specs).length > 0 && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3">
                      {Object.entries(specs).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b border-slate-100 pb-2 text-sm"
                        >
                          <dt className="font-medium text-slate-700">{key}</dt>
                          <dd className="text-slate-600">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Request a Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <InquiryForm productInterest={product.name} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
