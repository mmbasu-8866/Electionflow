"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  RefreshCcw, 
  Search, 
  MoreHorizontal, 
  MapPin,
  ChevronDown,
  TrendingUp,
  Bot,
  Sparkles
} from "lucide-react";
import { 
  ResponsiveContainer, 
  XAxis, 
  Tooltip, 
  Cell, 
  Pie, 
  PieChart,
  Label,
  RadialBar,
  RadialBarChart,
  BarChart,
  Bar
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { VoterBotChatWidget } from "@/components/assistant/voter-bot-chat-widget";

const ageData = [
  { age: "17-25", count: 2100 },
  { age: "26-35", count: 3200 },
  { age: "36-45", count: 2800 },
  { age: "46-55", count: 3500 },
  { age: "56+", count: 1800 },
];

const partyData = [
  { name: "03 PDIP", votes: "851K", color: "#E31E24" },
  { name: "12 PAN", votes: "656K", color: "#005BAA" },
  { name: "15 PSI", votes: "194K", color: "#EF4444" },
];

const candidates = [
  { name: "Ir. Hj. Rosinta W..", party: "PDIP", votes: "544K" },
  { name: "Prof. Dr. Lukas S..", party: "PDIP", votes: "354K" },
  { name: "Hj. Pramastia K..", party: "PAN", votes: "339K" },
  { name: "Siti Nur Hadalika", party: "PSI", votes: "221K" },
];

const genderData = [
  { name: "Male", value: 60, fill: "hsl(var(--primary))" },
  { name: "Female", value: 40, fill: "hsl(var(--primary) / 0.3)" },
];

export function DashboardContent() {
  const votePercentage = 85;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-4 rounded-3xl border shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-2xl cursor-pointer hover:bg-secondary/80 transition-colors border">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Daerah Pemilihan Jawa Barat Region-1</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Last Update</span>
            <span className="text-sm font-bold">02:35 PM</span>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10 gap-2 shadow-lg shadow-primary/20">
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Votes Received Radial Chart */}
        <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl font-bold text-primary">Votes Received</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="relative h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  barSize={15}
                  data={[{ value: votePercentage, fill: "hsl(var(--primary))" }]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="text-5xl font-black">{votePercentage}%</span>
                <span className="text-sm font-bold text-muted-foreground">2.432.766 Votes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Party */}
        <Card className="rounded-[2.5rem] border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Top Party</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {partyData.map((party, idx) => (
              <div key={idx} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full border bg-white flex items-center justify-center p-2 shadow-sm">
                     <div className="h-full w-full rounded-full" style={{ backgroundColor: party.color }} />
                  </div>
                  <span className="font-bold text-lg group-hover:text-primary transition-colors">{party.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg">{party.votes}</span>
                  <span className="text-xs text-muted-foreground font-bold">Votes</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Candidates */}
        <Card className="rounded-[2.5rem] border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Top Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {candidates.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-primary w-4">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-bold truncate max-w-[120px]">{c.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] h-5">{c.party}</Badge>
                  <span className="font-black">{c.votes} Votes</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Section (Positioned above Geographic Coverage) */}
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

      {/* Region Heatmap Card (Geographic Coverage) */}
      <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden h-[450px] relative">
        <CardHeader className="absolute top-0 left-0 z-10 bg-card/80 backdrop-blur-md w-full border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-primary">Geographic Coverage</CardTitle>
            <Badge className="bg-green-500/10 text-green-600 border-none">94.2% Counted</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-full">
           <div className="w-full h-full bg-muted relative group">
              <Image 
                src="https://picsum.photos/seed/heatmap/1200/800" 
                alt="Interactive geographic heatmap showing voter turnout across Jawa Barat Region-1" 
                fill
                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                unoptimized // Since it's a random picsum photo and we don't have remotePatterns set up yet
              />
              <div className="absolute top-1/2 left-1/3 h-48 w-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-1/4 left-1/2 h-32 w-32 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute bottom-1/4 right-1/4 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2">
                <div className="h-10 w-10 bg-white rounded-full p-2 shadow-2xl border-2 border-primary flex items-center justify-center">
                  <div className="h-full w-full bg-[#E31E24] rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="rounded-xl shadow-lg border">+</Button>
                <Button size="icon" variant="secondary" className="rounded-xl shadow-lg border">-</Button>
              </div>
           </div>
        </CardContent>
      </Card>

      {/* Voter Profile Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-primary px-2">Voter's Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-[2.5rem] border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={80}
                      strokeWidth={5}
                      paddingAngle={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-black">2.4M</tspan>
                                <tspan x={viewBox.cx} y={viewBox.cy + 24} className="fill-muted-foreground text-xs font-bold">Total</tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span>Male 60%</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-primary/30" />
                  <span>Female 40%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Age Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
                    <XAxis 
                      dataKey="age" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {ageData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 3 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border shadow-sm bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Average Submission Time</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4">
               <div className="h-36 w-36 rounded-full border-4 border-white/20 flex items-center justify-center relative">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black">25.46</span>
                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Minutes</span>
                  </div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-[spin_3s_linear_infinite]" />
               </div>
               <div className="flex items-center gap-2 mt-6">
                 <TrendingUp className="h-4 w-4" />
                 <span className="text-sm font-bold">+12% faster than 2019</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
