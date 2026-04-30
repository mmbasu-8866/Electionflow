"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flag, Users, TrendingUp, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const parties = [
  { 
    name: "03 PDI Perjuangan", 
    candidates: 12, 
    votes: "851,200", 
    lead: "+5.2%", 
    color: "#E31E24",
    desc: "Focusing on social welfare and national unity across Jabar-1."
  },
  { 
    name: "12 Partai Amanat Nasional", 
    candidates: 10, 
    votes: "656,330", 
    lead: "+2.1%", 
    color: "#005BAA",
    desc: "Advocating for economic reform and youth empowerment programs."
  },
  { 
    name: "15 Partai Solidaritas Indonesia", 
    candidates: 8, 
    votes: "194,500", 
    lead: "+0.8%", 
    color: "#EF4444",
    desc: "Transparency and digital governance for the new generation."
  },
];

export default function PartyCandidatesPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'election-hero');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <h1 className="text-xl font-headline font-bold text-accent">Party Performance</h1>
          </header>
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in">
              <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden group shadow-2xl">
                <img 
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/party1/1200/400"} 
                  alt="Party Hero" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="political campaign"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center p-12">
                  <div className="max-w-xl space-y-4">
                    <Badge className="bg-white text-primary font-bold">Election 2024</Badge>
                    <h2 className="text-5xl font-black text-white leading-tight">National Party Consensus</h2>
                    <p className="text-white/90 text-lg font-medium">Monitoring political coalition movements and ballot distributions per party seat.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {parties.map((party, idx) => (
                  <Card key={idx} className="rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all border-muted group overflow-hidden">
                    <div className="h-2 w-full" style={{ backgroundColor: party.color }} />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-14 w-14 rounded-2xl border bg-white flex items-center justify-center p-3 shadow-sm group-hover:rotate-6 transition-transform">
                          <div className="h-full w-full rounded-full" style={{ backgroundColor: party.color }} />
                        </div>
                        <Badge variant="outline" className="text-green-500 font-bold border-green-500/30 bg-green-50">
                          <TrendingUp className="h-3 w-3 mr-1" /> {party.lead}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-black">{party.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {party.desc}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-4 rounded-3xl space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Candidates</span>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="font-black text-lg">{party.candidates}</span>
                          </div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-3xl space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Votes</span>
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-accent" />
                            <span className="font-black text-lg">{party.votes}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="rounded-[2.5rem] border bg-secondary/30">
                <CardContent className="p-8 flex items-center justify-between gap-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black">Need More Details?</h3>
                    <p className="text-muted-foreground">Download the full CSV report for all participating parties including demographic breakdowns.</p>
                  </div>
                  <Info className="h-12 w-12 text-primary opacity-20" />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
