import { SidebarProvider } from "@/components/ui/sidebar";
import Navigation from "@/components/Navigation";
import { WorkerSidebar } from "@/components/WorkerSidebar";
import ManagerDashboard from "@/components/ManagerDashboard";
import FloatingChatButton from "@/components/FloatingChatButton";

export default function Manager() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SidebarProvider>
        <div className="flex w-full">
          <WorkerSidebar activeTab="overview" onTabChange={() => {}} />
          <main className="flex-1 p-6">
            <ManagerDashboard />
          </main>
        </div>
      </SidebarProvider>
      <FloatingChatButton />
    </div>
  );
}
