"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Award, CheckCircle2, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const candidatesList = [
  { name: "Ir. Hj. Rosinta Widowati", party: "PDI Perjuangan", votes: "544,120", education: "S3 Political Science", icon: "RW" },
  { name: "Prof. Dr. Lukas Sembiring", party: "PDI Perjuangan", votes: "354,800", education: "Ph.D Economics", icon: "LS" },
  { name: "Hj. Pramastia Kusuma", party: "Partai Amanat Nasional", votes: "339,210", education: "S2 Public Policy", icon: "PK" },
  { name: "Siti Nur Hadalika", party: "Partai Solidaritas Indonesia", votes: "221,440", education: "S1 Communication", icon: "SN" },
  { name: "Budi Santoso", party: "Partai Demokrat", votes: "156,000", education: "S2 Law", icon: "BS" },
  { name: "Anisa Rahma", party: "Partai Golkar", votes: "142,300", education: "S1 Engineering", icon: "AR" },
];

export default function CandidatesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <h1 className="text-xl font-headline font-bold text-accent">Candidate Profiles</h1>
          </header>
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-primary">Representatives</h2>
                  <p className="text-muted-foreground font-medium">Comprehensive list of all legislative candidates in Jabar-1 Region.</p>
                </div>
                <div className="w-full md:w-96 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Filter by name or party..." className="pl-12 h-14 rounded-2xl bg-card border-muted text-lg shadow-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {candidatesList.map((c, idx) => (
                  <Card key={idx} className="rounded-[2.5rem] border shadow-sm hover:border-primary/50 transition-all group overflow-hidden">
                    <CardHeader className="flex flex-row items-start justify-between pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-4 border-primary/20 shadow-xl group-hover:scale-110 transition-transform">
                          <AvatarImage src={`https://picsum.photos/seed/${c.icon}/200`} />
                          <AvatarFallback className="bg-primary text-white font-black text-xl">{c.icon}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <CardTitle className="text-xl font-black leading-tight group-hover:text-primary transition-colors">{c.name}</CardTitle>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold">{c.party}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                            <Award className="h-3 w-3" /> Education
                          </span>
                          <p className="text-sm font-bold truncate">{c.education}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 justify-end">
                            <CheckCircle2 className="h-3 w-3 text-green-500" /> Current Votes
                          </span>
                          <p className="text-lg font-black text-primary">{c.votes}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t flex items-center justify-between">
                         <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                             <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-muted overflow-hidden">
                               <img src={`https://picsum.photos/seed/supporter${idx}${i}/50`} alt="Supporter" />
                             </div>
                           ))}
                           <div className="h-8 w-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                             +2k
                           </div>
                         </div>
                         <Button variant="outline" className="rounded-full px-6 font-bold hover:bg-primary hover:text-white transition-all">View Full Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
