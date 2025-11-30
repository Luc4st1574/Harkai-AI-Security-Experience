import { Sidebar } from "@/components/dashboard/sidebar";
import { AuthGuard } from "@/lib/auth/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="md:ml-64 min-h-screen transition-all duration-300 pt-16 md:pt-0">
          <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
