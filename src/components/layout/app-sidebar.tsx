"use client";

import { 
  Home,
  Map,
  Users,
  Flag,
  User as UserIcon,
  Settings,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Region", url: "/region", icon: Map },
  { title: "Population Data", url: "/population", icon: Users },
  { title: "Party Candidates", url: "/party-candidates", icon: Flag },
  { title: "Candidates", url: "/candidates", icon: UserIcon },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

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
    <Sidebar variant="sidebar" className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/user1/100"} />
            <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">{user?.displayName || "Rio Dewanta"}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.email || "KPU Dapil Jabar-1"}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`h-11 px-4 rounded-xl transition-all ${
                      pathname === item.url 
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? "text-white" : ""}`} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <SidebarMenuButton 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-11 px-4 text-muted-foreground hover:bg-secondary rounded-xl"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </SidebarMenuButton>

        <SidebarMenuButton className="h-11 px-4 text-muted-foreground hover:bg-secondary rounded-xl">
          <Settings className="h-5 w-5" />
          <span>Setting</span>
        </SidebarMenuButton>

        {user ? (
          <SidebarMenuButton onClick={handleLogout} className="h-11 px-4 text-destructive hover:bg-destructive/10 rounded-xl">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton onClick={handleLogin} className="h-11 px-4 text-primary hover:bg-primary/10 rounded-xl">
            <UserIcon className="h-5 w-5" />
            <span>Sign In</span>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}