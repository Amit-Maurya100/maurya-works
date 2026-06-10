import Link from "next/link";
import {
  Award,
  Clock,
  Cog,
  Shield,
  Wrench,
  Factory,
  ArrowRight,
} from "lucide-react";
import { CTABanner } from "@/components/layout/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";

export default async function HomePage() {
  const settings = await getSiteSettings();

  const [featuredProducts, categories, industries] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, published: true },
      include: { category: true },
      take: 4,
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, take: 7 }),
    prisma.industry.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 5,
    }),
  ]);

  const whyChooseUs = [
    {
      icon: Cog,
      title: "Precision Manufacturing",
      description: "Engineered machinery built to exacting standards for consistent production output.",
    },
    {
      icon: Wrench,
      title: "Expert Repair Services",
      description: "Rapid diagnosis and repair with genuine spare parts and experienced technicians.",
    },
    {
      icon: Clock,
      title: "Minimal Downtime",
      description: "Emergency breakdown support and preventive maintenance to keep your lines running.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "ISO-certified processes with rigorous quality control at every stage.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Badge variant="warning" className="mb-4">
            {settings.tagline}
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {settings.hero_title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            {settings.hero_subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 bg-transparent text-white hover:bg-slate-800">
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Trusted Textile Machinery Partner
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {settings.about_history}
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/about">
                  Learn more about us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "30+", label: "Years Experience" },
                { value: "500+", label: "Clients Served" },
                { value: "1000+", label: "Machines Repaired" },
                { value: "24/7", label: "Emergency Support" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <div className="text-3xl font-bold text-amber-500">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Products & Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Complete range of textile machinery, spare parts, and maintenance services.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products/${cat.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <Factory className="h-8 w-8 text-amber-500" />
                    <CardTitle className="text-base">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Industries We Serve
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card key={ind.id}>
                <CardHeader>
                  <CardTitle>{ind.name}</CardTitle>
                  <CardDescription>{ind.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/industries">View All Industries</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Why Choose Maurya Textile
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                  <item.icon className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Featured Machinery</h2>
              <Button asChild variant="link">
                <Link href="/products">View all</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.category.slug}/${product.slug}`}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <div className="flex h-40 items-center justify-center bg-slate-100">
                      <Cog className="h-16 w-16 text-slate-300" />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary">{product.category.name}</Badge>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">
          <Award className="h-8 w-8 text-amber-500" />
          <span className="text-sm font-medium text-slate-600">ISO 9001:2015 Certified</span>
          <span className="text-sm font-medium text-slate-600">ISO 14001:2015 Certified</span>
          <span className="text-sm font-medium text-slate-600">CE Marking Compliant</span>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
