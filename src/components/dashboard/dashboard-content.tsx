"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  RefreshCcw, 
  Search, 
  MoreHorizontal, 
  MapPin,
  ChevronDown,
  Bot,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CandidateStats } from "./candidate-stats";
import { GeographicCoverage } from "./geographic-coverage";
import { VoteStats } from "./vote-stats";
import { PartyStats } from "./party-stats";
import { VoterProfile } from "./voter-profile";

/**
 * Dynamically import the heavy Chat Widget to improve initial load performance.
 */
const VoterBotChatWidget = dynamic(() => import("@/components/assistant/voter-bot-chat-widget").then(mod => mod.VoterBotChatWidget), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">
    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Loading Assistant...</span>
  </div>
});

/**
 * DashboardContent - The main dashboard view for Electionflow.
 * Displays real-time stats, party leads, and AI assistant.
 */
export function DashboardContent() {
  const votePercentage = 85;

  const ageData = useMemo(() => [
    { age: "17-25", count: 2100 },
    { age: "26-35", count: 3200 },
    { age: "36-45", count: 2800 },
    { age: "46-55", count: 3500 },
    { age: "56+", count: 1800 },
  ], []);

  const partyData = useMemo(() => [
    { name: "03 PDIP", votes: "851K", color: "#E31E24" },
    { name: "12 PAN", votes: "656K", color: "#005BAA" },
    { name: "15 PSI", votes: "194K", color: "#EF4444" },
  ], []);

  const candidates = useMemo(() => [
    { name: "Ir. Hj. Rosinta W..", party: "PDIP", votes: "544K" },
    { name: "Prof. Dr. Lukas S..", party: "PDIP", votes: "354K" },
    { name: "Hj. Pramastia K..", party: "PAN", votes: "339K" },
    { name: "Siti Nur Hadalika", party: "PSI", votes: "221K" },
  ], []);

  const genderData = useMemo(() => [
    { name: "Male", value: 60, fill: "hsl(var(--primary))" },
    { name: "Female", value: 40, fill: "hsl(var(--primary) / 0.3)" },
  ], []);

  return (
    <div className="space-y-6 pb-12">
      <h2 className="sr-only">Dashboard Overview</h2>
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-4 rounded-3xl border shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-2xl cursor-pointer hover:bg-secondary/80 transition-colors border">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Daerah Pemilihan Jawa Barat Region-1</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10" aria-label="Search across regions">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10" aria-label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Last Update</span>
            <span className="text-sm font-bold">02:35 PM</span>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10 gap-2 shadow-lg shadow-primary/20"
            aria-label="Refresh latest election data"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" role="region" aria-label="Top Stats Overview">
        <VoteStats percentage={votePercentage} totalVotes="2.432.766" />
        <PartyStats data={partyData} />
        <CandidateStats candidates={candidates} />
      </div>

      {/* AI Assistant Section */}
      <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden bg-card">
        <CardHeader className="bg-primary/5 border-b shrink-0 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-black flex items-center gap-2 text-primary">
                  Election Assistant
                  <Sparkles className="h-3 w-3 text-accent" />
                </CardTitle>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">AI Powered Insights & Real-time Q&A</p>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-none font-bold">LIVE & READY</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px]">
            <VoterBotChatWidget />
          </div>
        </CardContent>
      </Card>

      <GeographicCoverage />
      
      <VoterProfile genderData={genderData} ageData={ageData} />
    </div>
  );
}
