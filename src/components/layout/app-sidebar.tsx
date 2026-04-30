
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
  Sun,
  Calendar,
  BookOpen,
  HelpCircle
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
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Region", url: "/region", icon: Map },
  { title: "Population Data", url: "/population", icon: Users },
];

const recapitulationItems = [
  { title: "Party Results", url: "/party-candidates", icon: Flag },
  { title: "Candidate Results", url: "/candidates", icon: UserIcon },
];

const assistanceItems = [
  { title: "Key Dates", url: "/timeline", icon: Calendar },
  { title: "Process Guides", url: "/guides", icon: HelpCircle },
  { title: "Election Glossary", url: "/glossary", icon: BookOpen },
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

  const NavItem = ({ item }: { item: typeof mainNavItems[0] }) => (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.url}
        className={`h-11 px-4 rounded-xl transition-all ${
          pathname === item.url 
          ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" 
          : "text-[#495057] dark:text-gray-300 hover:bg-[#F1F3F5] dark:hover:bg-gray-800 font-bold"
        }`}
      >
        <Link href={item.url}>
          <item.icon className={`h-5 w-5 ${pathname === item.url ? "text-white" : ""}`} />
          <span className="font-black text-sm">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-12 w-12 border-2 border-primary ring-2 ring-primary/20 ring-offset-2">
            <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/rio/100"} />
            <AvatarFallback className="font-black">{user?.displayName?.charAt(0) || "R"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black text-foreground truncate">{user?.displayName || "Rio Dewanta"}</span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider truncate">KPU Dapil Jabar-1</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavItems.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Recapitulation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {recapitulationItems.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Assistance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {assistanceItems.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <SidebarMenuButton 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-11 px-4 text-foreground font-bold hover:bg-secondary rounded-xl transition-colors"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="font-black text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </SidebarMenuButton>

        <SidebarMenuButton className="h-11 px-4 text-foreground font-bold hover:bg-secondary rounded-xl">
          <Settings className="h-5 w-5" />
          <span className="font-black text-sm">Settings</span>
        </SidebarMenuButton>

        {user ? (
          <SidebarMenuButton onClick={handleLogout} className="h-11 px-4 text-destructive font-black hover:bg-destructive/10 rounded-xl">
            <LogOut className="h-5 w-5" />
            <span className="text-sm">Sign Out</span>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton onClick={handleLogin} className="h-11 px-4 text-primary font-black hover:bg-primary/10 rounded-xl">
            <UserIcon className="h-5 w-5" />
            <span className="text-sm">Sign In</span>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
