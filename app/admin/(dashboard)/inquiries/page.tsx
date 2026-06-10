import { format } from "date-fns";
import { InquiryStatusForm } from "@/components/admin/inquiry-status-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
      <p className="mt-1 text-slate-500">{inquiries.length} total inquiries</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <p className="text-sm text-slate-500">No inquiries yet.</p>
          ) : (
            <div className="space-y-6">
              {inquiries.map((inq) => (
                <div key={inq.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{inq.name}</p>
                      {inq.company && (
                        <p className="text-sm text-slate-500">{inq.company}</p>
                      )}
                      <p className="mt-1 text-sm">
                        <a href={`mailto:${inq.email}`} className="text-amber-600 hover:underline">
                          {inq.email}
                        </a>
                        {" · "}
                        <a href={`tel:${inq.phone}`} className="text-amber-600 hover:underline">
                          {inq.phone}
                        </a>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
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
                      <InquiryStatusForm id={inq.id} currentStatus={inq.status} />
                    </div>
                  </div>
                  {inq.productInterest && (
                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-medium">Interest:</span> {inq.productInterest}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-slate-700">{inq.message}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {format(inq.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
