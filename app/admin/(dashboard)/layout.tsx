import { AdminNav } from "@/components/admin/admin-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNav />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
