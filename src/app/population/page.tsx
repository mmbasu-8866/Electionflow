"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, PieChart as PieChartIcon, TrendingUp, Map } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Label } from "recharts";

const districtData = [
  { name: "Bandung City", population: "2.4M", registered: 1.8 },
  { name: "Cimahi", population: "0.6M", registered: 0.4 },
  { name: "Bandung West", population: "1.7M", registered: 1.2 },
  { name: "Sumedang", population: "1.1M", registered: 0.8 },
];

const genderData = [
  { name: "Male", value: 52, fill: "hsl(var(--primary))" },
  { name: "Female", value: 48, fill: "hsl(var(--primary) / 0.3)" },
];

export default function PopulationPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
        <h1 className="text-xl font-headline font-bold text-accent">Population & Voter Data</h1>
      </header>
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Population", val: "5.8M", icon: Users, trend: "+1.2%" },
              { label: "Registered Voters", val: "4.2M", icon: PieChartIcon, trend: "+0.8%" },
              { label: "Turnout Expectation", val: "78%", icon: TrendingUp, trend: "+5.0%" },
              { label: "Sub-Districts", val: "24", icon: Map, trend: "Stable" },
            ].map((stat, i) => (
              <Card key={i} className="rounded-[2rem] border shadow-sm">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</p>
                    <p className="text-3xl font-black text-primary">{stat.val}</p>
                    <span className="text-[10px] text-green-500 font-bold">{stat.trend} from 2019</span>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-black">District Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtData} layout="vertical">
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
                      />
                      <Bar dataKey="registered" radius={[0, 6, 6, 0]} barSize={20}>
                        {districtData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-black">Demographic Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        dataKey="value"
                        innerRadius={80}
                        outerRadius={110}
                        strokeWidth={8}
                        paddingAngle={10}
                      >
                         <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                  <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-black">4.2M</tspan>
                                  <tspan x={viewBox.cx} y={viewBox.cy + 24} className="fill-muted-foreground text-xs font-bold">Active Voters</tspan>
                                </text>
                              )
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
