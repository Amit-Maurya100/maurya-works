import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [newInquiries, totalProducts, totalProjects, totalPosts, recentInquiries] =
    await Promise.all([
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.product.count(),
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "New Inquiries", value: newInquiries, href: "/admin/inquiries" },
    { label: "Products", value: totalProducts, href: "/admin/products" },
    { label: "Projects", value: totalProjects, href: "/admin/projects" },
    { label: "Blog Posts", value: totalPosts, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Overview of your website content and inquiries.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-slate-500">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">{inq.name}</p>
                    <p className="text-sm text-slate-500">{inq.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        inq.status === "new"
                          ? "warning"
                          : inq.status === "contacted"
                            ? "success"
                            : "secondary"
                      }
                    >
                      {inq.status}
                    </Badge>
                    <p className="mt-1 text-xs text-slate-400">
                      {format(inq.createdAt, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
