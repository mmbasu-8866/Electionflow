"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { PageContainer } from "@/components/layout/page-container";

/**
 * PartyCandidatesPage - Recapitulation of votes by political party.
 */
export default function PartyCandidatesPage() {
  const partyData = useMemo(() => [
    { name: "PDI-P", votes: 851000, color: "#E31E24" },
    { name: "PAN", votes: 656000, color: "#005BAA" },
    { name: "PSI", votes: 194000, color: "#EF4444" },
    { name: "Demokrat", votes: 156000, color: "#0072BC" },
    { name: "Golkar", votes: 142000, color: "#FFFF00" },
    { name: "PKS", votes: 98000, color: "#F7941E" },
  ], []);

  return (
    <PageContainer title="Vote Recapitulation - Parties">
      <h2 className="sr-only">Party Standings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-[2.5rem] border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-black">Party Vote Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={partyData} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 'bold' }}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [new Intl.NumberFormat().format(value) + " Votes", "Count"]}
                  />
                  <Bar dataKey="votes" radius={[0, 10, 10, 0]} barSize={40}>
                    {partyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-xl font-bold px-2 text-primary">Live Standings</h3>
          {partyData.map((party, i) => (
            <Card key={i} className="rounded-3xl border shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-5">
                  <div className="h-12 w-12 rounded-2xl border flex items-center justify-center p-2 bg-white shadow-sm">
                    <div className="h-full w-full rounded-full" style={{ backgroundColor: party.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">{party.name}</h4>
                      <Badge variant="secondary" className="font-black text-[10px]">{i + 1}ST</Badge>
                    </div>
                    <p className="text-sm font-black text-primary">{new Intl.NumberFormat().format(party.votes)} <span className="text-muted-foreground text-xs font-bold uppercase">Votes</span></p>
                  </div>
                </div>
                <div className="h-1 w-full opacity-20" style={{ backgroundColor: party.color }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
