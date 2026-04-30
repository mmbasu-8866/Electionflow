"use client";

import { 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Library, 
  Home, 
  Info,
  Vote,
  LogIn,
  LogOut,
  User as UserIcon
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
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { user } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <Vote className="h-6 w-6" />
          </div>
          <span className="text-lg font-headline font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            Election<span className="text-accent">flow</span>
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
        {user ? (
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2 flex-1 group-data-[collapsible=icon]:hidden overflow-hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.displayName?.charAt(0) || <UserIcon className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">{user.displayName}</span>
              </div>
            </div>
            <SidebarMenuButton onClick={handleLogout} className="w-auto ml-auto" tooltip="Sign Out">
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
            </SidebarMenuButton>
          </div>
        ) : (
          <SidebarMenuButton onClick={handleLogin} tooltip="Sign In">
            <LogIn className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Sign In with Google</span>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
