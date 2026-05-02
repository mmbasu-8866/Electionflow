"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw, MapPin, ChevronDown, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo } from "react";

export default function CandidatesPage() {
  const candidateData = useMemo(() => [
    { id: "01", name: "Ir. Hj. Rosinta Widowati", party: "PDI-P", votes: "544.120", percentage: 22, region: "Jabar-1", icon: "RW" },
    { id: "02", name: "Prof. Dr. Lukas Sembiring", party: "PDI-P", votes: "354.800", percentage: 15, region: "Jabar-1", icon: "LS" },
    { id: "03", name: "Hj. Pramastia Kusuma", party: "PAN", votes: "339.210", percentage: 14, region: "Jabar-1", icon: "PK" },
    { id: "04", name: "Siti Nur Hadalika", party: "PSI", votes: "221.440", percentage: 9, region: "Jabar-1", icon: "SN" },
    { id: "05", name: "Budi Santoso", party: "Demokrat", votes: "156.000", percentage: 6, region: "Jabar-1", icon: "BS" },
    { id: "06", name: "Anisa Rahma", party: "Golkar", votes: "142.300", percentage: 6, region: "Jabar-1", icon: "AR" },
  ], []);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Header Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-2xl border shadow-sm cursor-pointer">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold">Daerah Pemilihan Jawa Barat Region-1</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Last Update</span>
            <span className="text-sm font-black">02:35 PM</span>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10 gap-2 shadow-lg shadow-primary/20">
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <h2 className="text-2xl font-black text-foreground">Vote Recapitulation - Candidates</h2>

          {/* Summary Card */}
          <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-card">
            <CardContent className="p-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Candidate Overview</span>
                <div className="flex items-baseline gap-4">
                  <h3 className="text-3xl font-black text-foreground">Top Individual Performers</h3>
                  <span className="text-4xl font-black text-primary">1.757.870</span>
                  <span className="text-sm font-bold text-muted-foreground">Votes Pooled</span>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="mt-8 flex items-center gap-4 p-2 bg-background rounded-2xl border border-dashed border-muted-foreground/20">
                <div className="flex items-center bg-card rounded-xl px-3 flex-1 border">
                  <Search className="h-4 w-4 text-muted-foreground mr-2" aria-hidden="true" />
                  <Input 
                    placeholder="Search Candidates" 
                    aria-label="Search candidates by name"
                    className="border-none shadow-none focus-visible:ring-0" 
                  />
                </div>
                <Select aria-label="Filter by party">
                  <SelectTrigger className="w-48 rounded-xl bg-card border" aria-label="Select party filter">
                    <SelectValue placeholder="Party" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdip">PDI-P</SelectItem>
                    <SelectItem value="pan">PAN</SelectItem>
                    <SelectItem value="psi">PSI</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="rounded-xl px-8 border-primary text-primary hover:bg-primary/5 font-bold">Filter</Button>
              </div>
            </CardContent>
          </Card>

          {/* Table Card */}
          <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-card">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-24 font-black text-muted-foreground uppercase text-[10px] px-8">Rank</TableHead>
                  <TableHead className="font-black text-muted-foreground uppercase text-[10px]">Candidate</TableHead>
                  <TableHead className="w-32 font-black text-muted-foreground uppercase text-[10px]">Party</TableHead>
                  <TableHead className="font-black text-muted-foreground uppercase text-[10px]">Vote Progress</TableHead>
                  <TableHead className="w-48 font-black text-muted-foreground uppercase text-[10px] text-right">Total Votes</TableHead>
                  <TableHead className="w-32 font-black text-muted-foreground uppercase text-[10px] text-right px-8">Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidateData.map((candidate) => (
                  <TableRow key={candidate.id} className="group border-b border-border last:border-none">
                    <TableCell className="font-black text-lg text-foreground px-8">{candidate.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border shadow-sm">
                          <AvatarImage src={`https://picsum.photos/seed/${candidate.icon}/100`} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{candidate.icon}</AvatarFallback>
                        </Avatar>
                        <span className="font-black text-foreground group-hover:text-primary transition-colors">{candidate.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-muted rounded-full text-[10px] font-black uppercase text-muted-foreground">{candidate.party}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Target Coverage</span>
                          <span className="font-black text-sm text-foreground">{candidate.percentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${candidate.percentage}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-black text-foreground">{candidate.votes}</TableCell>
                    <TableCell className="text-right font-bold text-muted-foreground px-8">{candidate.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}
