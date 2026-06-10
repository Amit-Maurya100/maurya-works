import type { Metadata } from "next";
import Link from "next/link";
import { Award, Target, Users } from "lucide-react";
import { CTABanner } from "@/components/layout/cta-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Maurya Textile Machinery — our history, capabilities, and values.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const certifications = await prisma.certification.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Building trust in textile machinery since 1995.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Our History</h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            {settings.about_history}
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Manufacturing Capabilities</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "CNC machining and precision fabrication",
              "Assembly and testing of spinning & weaving machinery",
              "Custom engineering for specialized textile applications",
              "In-house quality control and trial run facilities",
              "Spare parts manufacturing and inventory management",
              "On-site installation and commissioning teams",
            ].map((cap) => (
              <Card key={cap}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <Target className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <p className="text-slate-700">{cap}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Mission</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">{settings.about_mission}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Values</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">{settings.about_values}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Our Team</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Our team of 80+ engineers, technicians, and support staff brings decades of
            combined experience in textile machinery. From design to after-sales service,
            every team member is committed to your production success.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { role: "Engineering", count: "25+", icon: Target },
              { role: "Field Technicians", count: "40+", icon: Users },
              { role: "Quality & Support", count: "15+", icon: Award },
            ].map((team) => (
              <Card key={team.role} className="text-center">
                <CardHeader>
                  <team.icon className="mx-auto h-10 w-10 text-amber-500" />
                  <CardTitle>{team.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-slate-900">{team.count}</p>
                  <p className="text-sm text-slate-500">Team members</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {certifications.map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <Award className="h-8 w-8 text-amber-500" />
                    <CardTitle className="text-base">{cert.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500">{cert.issuer}</p>
                    {cert.description && (
                      <p className="mt-2 text-sm text-slate-600">{cert.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link
              href="/quality"
              className="mt-6 inline-block text-sm font-medium text-amber-600 hover:underline"
            >
              View quality standards →
            </Link>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
