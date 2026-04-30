
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
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-12 w-12 border-2 border-primary ring-2 ring-primary/20 ring-offset-2">
            <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/rio/100"} />
            <AvatarFallback>{user?.displayName?.charAt(0) || "R"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black text-[#212529] truncate">{user?.displayName || "Rio Dewanta"}</span>
            <span className="text-xs font-bold text-muted-foreground truncate">{user?.email || "KPU Dapil Jabar-1"}</span>
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
                    className={`h-12 px-4 rounded-2xl transition-all ${
                      pathname === item.url 
                      ? "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/30" 
                      : "text-[#495057] hover:bg-[#F1F3F5] font-bold"
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? "text-white" : ""}`} />
                      <span className="font-black text-sm">{item.title}</span>
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
          className="h-11 px-4 text-[#495057] font-bold hover:bg-[#F1F3F5] rounded-xl"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </SidebarMenuButton>

        <SidebarMenuButton className="h-11 px-4 text-[#495057] font-bold hover:bg-[#F1F3F5] rounded-xl">
          <Settings className="h-5 w-5" />
          <span>Setting</span>
        </SidebarMenuButton>

        {user ? (
          <SidebarMenuButton onClick={handleLogout} className="h-11 px-4 text-destructive font-black hover:bg-destructive/10 rounded-xl">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton onClick={handleLogin} className="h-11 px-4 text-primary font-black hover:bg-primary/10 rounded-xl">
            <UserIcon className="h-5 w-5" />
            <span>Sign In</span>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
