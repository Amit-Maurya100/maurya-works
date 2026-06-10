import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-6 text-xl font-semibold text-slate-900">
          {block.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p key={i} className="mt-4 text-slate-600 leading-relaxed">
        {block}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  const related = await prisma.blogPost.findMany({
    where: { published: true, slug: { not: slug } },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-sm text-amber-400 hover:underline">
            ← Back to Blog
          </Link>
          {post.publishedAt && (
            <time className="mt-4 block text-sm text-slate-400">
              {format(post.publishedAt, "MMMM d, yyyy")}
            </time>
          )}
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-slate-300">{post.excerpt}</p>
        </div>
      </section>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">{renderContent(post.content)}</div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900">Related Articles</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">{r.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{r.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
