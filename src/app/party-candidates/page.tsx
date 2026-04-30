
"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
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
import { Progress } from "@/components/ui/progress";

const partyData = [
  { id: "01", name: "03 PDI-P", fullName: "Partai Demokrasi Indonesia Perjuangan", votes: "851.468", percentage: 35, color: "#E31E24", region: "Jabar-1" },
  { id: "02", name: "12 PAN", fullName: "Partai Amanat Nasional", votes: "656.846", percentage: 27, color: "#005BAA", region: "Jabar-1" },
  { id: "03", name: "15 PSI", fullName: "Partai Solidaritas Indonesia", votes: "194.621", percentage: 8, color: "#EF4444", region: "Jabar-1" },
  { id: "04", name: "04 Golkar", fullName: "Partai Golongan Karya", votes: "121.638", percentage: 5, color: "#FFD700", region: "Jabar-1" },
  { id: "05", name: "02 Gerindra", fullName: "Partai Gerakan Indonesia", votes: "97.310", percentage: 4, color: "#B22222", region: "Jabar-1" },
  { id: "06", name: "05 Nasdem", fullName: "Partai Nasional Demokrasi", votes: "96.887", percentage: 4, color: "#004A99", region: "Jabar-1" },
  { id: "07", name: "14 Demokrat", fullName: "Partai Demokrat", votes: "72.983", percentage: 3, color: "#005BAA", region: "Jabar-1" },
  { id: "08", name: "17 PPP", fullName: "Partai Persatuan Pembangunan", votes: "72.665", percentage: 3, color: "#008000", region: "Jabar-1" },
  { id: "09", name: "08 PKS", fullName: "Partai Keadilan Sosial", votes: "48.655", percentage: 2, color: "#FE5000", region: "Jabar-1" },
];

export default function PartyCandidatesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen bg-[#F8F9FA]">
          {/* Top Header Bar */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#F1F3F5] px-4 py-2 rounded-2xl border shadow-sm cursor-pointer">
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
              <h2 className="text-2xl font-black text-[#212529]">Vote Recapitulation - Party</h2>

              {/* Total Votes Card */}
              <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Last Updates 02.35 PM</span>
                    <div className="flex items-baseline gap-4">
                      <h3 className="text-3xl font-black text-[#212529]">Total Votes Received</h3>
                      <span className="text-4xl font-black text-primary">2.432.766</span>
                      <span className="text-sm font-bold text-muted-foreground">Votes</span>
                    </div>
                  </div>

                  {/* Filter Bar */}
                  <div className="mt-8 flex items-center gap-4 p-2 bg-[#F8F9FA] rounded-2xl border border-dashed border-muted-foreground/20">
                    <div className="flex items-center bg-white rounded-xl px-3 flex-1 border">
                      <Search className="h-4 w-4 text-muted-foreground mr-2" />
                      <Input placeholder="Pick Party" className="border-none shadow-none focus-visible:ring-0" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-48 rounded-xl bg-white border">
                        <SelectValue placeholder="Orderal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Highest Votes</SelectItem>
                        <SelectItem value="asc">Lowest Votes</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="rounded-xl px-8 border-primary text-primary hover:bg-primary/5 font-bold">Apply</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Table Card */}
              <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-[#E9ECEF]">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="w-24 font-black text-[#495057] uppercase text-[10px] px-8">Orderal</TableHead>
                      <TableHead className="w-32 font-black text-[#495057] uppercase text-[10px]">Party Logo</TableHead>
                      <TableHead className="font-black text-[#495057] uppercase text-[10px]">Vote Recapitulation</TableHead>
                      <TableHead className="w-48 font-black text-[#495057] uppercase text-[10px] text-right">Total Votes</TableHead>
                      <TableHead className="w-32 font-black text-[#495057] uppercase text-[10px] text-right px-8">Region</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partyData.map((party) => (
                      <TableRow key={party.id} className="group border-b border-[#F1F3F5] last:border-none">
                        <TableCell className="font-black text-lg text-[#212529] px-8">{party.id}</TableCell>
                        <TableCell>
                          <div className="h-12 w-12 rounded-xl border bg-[#F8F9FA] flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                            <div className="h-full w-full rounded-full" style={{ backgroundColor: party.color }} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="font-black text-[#212529]">{party.name}</span>
                                <span className="text-[10px] font-bold text-muted-foreground">{party.fullName}</span>
                              </div>
                              <span className="font-black text-sm text-[#212529]">{party.percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#E9ECEF] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000" 
                                style={{ width: `${party.percentage}%` }} 
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-black text-[#212529]">{party.votes}</TableCell>
                        <TableCell className="text-right font-bold text-muted-foreground px-8">{party.region}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
