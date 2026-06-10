import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/layout/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description: "Completed installations, repairs, and machinery upgrades across India.",
};

const filterTypes = [
  { value: "all", label: "All Projects" },
  { value: "installation", label: "Installations" },
  { value: "repair", label: "Repairs" },
  { value: "upgrade", label: "Upgrades" },
];

type Props = { searchParams: Promise<{ type?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const projects = await prisma.project.findMany({
    where: {
      published: true,
      ...(type && type !== "all" ? { projectType: type as "installation" | "repair" | "upgrade" } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Projects & Portfolio</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Real results from installations, repairs, and upgrades across textile facilities.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {filterTypes.map((f) => (
              <Link
                key={f.value}
                href={f.value === "all" ? "/projects" : `/projects?type=${f.value}`}
              >
                <Badge
                  variant={
                    (!type && f.value === "all") || type === f.value ? "default" : "outline"
                  }
                  className="cursor-pointer px-4 py-1.5"
                >
                  {f.label}
                </Badge>
              </Link>
            ))}
          </div>

          {projects.length === 0 ? (
            <p className="text-center text-slate-500">No projects found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300" />
                    <CardHeader>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {project.projectType}
                        </Badge>
                        <Badge variant="outline">{project.clientType}</Badge>
                      </div>
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {project.summary}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
