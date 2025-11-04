import { NavLink } from "react-router-dom";
import { Home, Mail, User, Briefcase, Video, MessageSquare, FileText } from "lucide-react";
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

interface WorkerSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "inbox", label: "Inbox", icon: Mail },
  { id: "jobs", label: "AI Job Matches", icon: Briefcase },
  { id: "assessment", label: "Skill Assessment", icon: Video },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "references", label: "References", icon: FileText },
];

export function WorkerSidebar({ activeTab, onTabChange }: WorkerSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Worker Dashboard</SidebarGroupLabel>
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