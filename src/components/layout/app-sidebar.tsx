"use client";

import { 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Library, 
  Home, 
  Info,
  Vote
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Assistant",
    url: "/",
    icon: MessageSquare,
  },
  {
    title: "Process Guides",
    url: "/guides",
    icon: BookOpen,
  },
  {
    title: "Election Timeline",
    url: "/timeline",
    icon: Calendar,
  },
  {
    title: "Glossary",
    url: "/glossary",
    icon: Library,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <Vote className="h-6 w-6" />
          </div>
          <span className="text-lg font-headline font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            Voter<span className="text-accent">Bot</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="transition-all duration-200"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <Info className="h-3 w-3" />
          <span>v1.0 Civic Tech</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
