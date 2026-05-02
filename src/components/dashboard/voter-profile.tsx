"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Label, BarChart, XAxis, Tooltip, Bar, Cell } from "recharts";

import { memo } from "react";

interface GenderData {
  name: string;
  value: number;
  fill: string;
}

interface AgeData {
  age: string;
  count: number;
}

interface VoterProfileProps {
  genderData: GenderData[];
  ageData: AgeData[];
}

/**
 * VoterProfile - Displays demographic breakdown for voters.
 * Optimized with React.memo.
 */
export const VoterProfile = memo(function VoterProfile({ genderData, ageData }: VoterProfileProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-primary px-2">Voter&apos;s Profile</h3>
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
                        const vb = viewBox as { cx: number; cy: number };
                        if (vb && typeof vb.cx === 'number' && typeof vb.cy === 'number') {
                          return (
                            <text x={vb.cx} y={vb.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={vb.cx} y={vb.cy} className="fill-foreground text-2xl font-black">2.4M</tspan>
                              <tspan x={vb.cx} y={vb.cy + 24} className="fill-muted-foreground text-xs font-bold">Total</tspan>
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
  );
});
