import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
        <h1 className="text-xl font-headline font-bold text-accent">Electionflow Assistant</h1>
      </header>
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <DashboardContent />
      </main>
    </div>
  );
}
