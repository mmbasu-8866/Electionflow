import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <h1 className="text-xl font-headline font-bold text-accent">VoterBot Assistant</h1>
          </header>
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <DashboardContent />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
