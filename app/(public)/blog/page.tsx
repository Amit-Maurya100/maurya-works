import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { CTABanner } from "@/components/layout/cta-banner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description: "Textile machinery maintenance tips, efficiency guides, and industry trends.",
};

const POSTS_PER_PAGE = 6;

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const skip = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Blog & Resources</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Maintenance tips, efficiency guides, and industry insights for textile professionals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500">No blog posts yet.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300" />
                    <CardHeader>
                      {post.publishedAt && (
                        <time className="text-xs text-slate-500">
                          {format(post.publishedAt, "MMMM d, yyyy")}
                        </time>
                      )}
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={p === 1 ? "/blog" : `/blog?page=${p}`}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    p === page
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {p}
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
