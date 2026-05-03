import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { PageContainer } from "@/components/layout/page-container";

export const revalidate = 60; // Refresh every 60 seconds

export default function Home() {
  return (
    <PageContainer title="Electionflow Assistant">
      <DashboardContent />
    </PageContainer>
  );
}
