import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { CTABanner } from "@/components/layout/cta-banner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Industries Served",
  description: "Textile machinery solutions for mills, garment manufacturers, and more.",
};

export default async function IndustriesPage() {
  const industries = await prisma.industry.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Industries Served</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Tailored machinery and service solutions for every segment of the textile industry.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card key={ind.id}>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-amber-500" />
                  <CardTitle>{ind.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {ind.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
