import { NavLink } from "react-router-dom";
import { LayoutDashboard, Mail, Users, Briefcase, BarChart3, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface FactorySidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "inbox", label: "Inbox", icon: Mail },
  { id: "hiring", label: "Hire Workers", icon: Users },
  { id: "jobs", label: "Job Posts", icon: Briefcase },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
];

export function FactorySidebar({ activeTab, onTabChange }: FactorySidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Factory Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className={activeTab === item.id ? "bg-accent" : ""}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {state !== "collapsed" && <span>{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}