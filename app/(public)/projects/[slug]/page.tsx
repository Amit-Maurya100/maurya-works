import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug, published: true } });
  if (!project) notFound();

  return (
    <>
      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="text-sm text-amber-400 hover:underline">
            ← All Projects
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="warning" className="capitalize">
              {project.projectType}
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {project.clientType}
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{project.summary}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {(project.beforeImage || project.afterImage) ? (
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {project.beforeImage && (
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-500">Before</p>
                  <div className="h-64 rounded-lg bg-slate-200" />
                </div>
              )}
              {project.afterImage && (
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-500">After</p>
                  <div className="h-64 rounded-lg bg-slate-200" />
                </div>
              )}
            </div>
          ) : (
            <div className="mb-8 h-64 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300" />
          )}

          {project.content && (
            <div className="prose max-w-3xl text-slate-600">
              {project.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
