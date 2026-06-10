import type { Metadata } from "next";
import { Award, CheckCircle, ClipboardCheck } from "lucide-react";
import { CTABanner } from "@/components/layout/cta-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Quality & Certifications",
  description: "Our manufacturing standards, quality control process, and certifications.",
};

export default async function QualityPage() {
  const settings = await getSiteSettings();
  const certifications = await prisma.certification.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  const qcSteps = [
    "Incoming material inspection and certification verification",
    "In-process dimensional and tolerance checks",
    "Assembly verification and alignment testing",
    "Trial run under production-simulated conditions",
    "Final QC sign-off and documentation",
    "Packaging and dispatch inspection",
  ];

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Quality & Certifications</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Rigorous standards at every stage of manufacturing and service delivery.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Manufacturing Standards</h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            We adhere to internationally recognized manufacturing standards, ensuring every
            machine meets performance, safety, and durability requirements before leaving our facility.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Quality Control Process</h2>
          <p className="mt-4 max-w-3xl text-slate-600">{settings.quality_process}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qcSteps.map((step, i) => (
              <Card key={step}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <span className="text-xs font-bold text-amber-600">Step {i + 1}</span>
                    <p className="mt-1 text-sm text-slate-700">{step}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <Award className="h-10 w-10 text-amber-500" />
                  <CardTitle className="text-base">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-slate-500">{cert.issuer}</p>
                  {cert.description && (
                    <p className="mt-2 text-sm text-slate-600">{cert.description}</p>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
