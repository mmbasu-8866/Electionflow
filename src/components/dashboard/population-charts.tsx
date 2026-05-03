"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Label } from "recharts";

interface DistrictData {
  name: string;
  population: string;
  registered: number;
}

interface GenderData {
  name: string;
  value: number;
  fill: string;
}

export const PopulationCharts = {
  DistrictParticipation: ({ data }: { data: DistrictData[] }) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
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
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ),
  DemographicBreakdown: ({ data }: { data: GenderData[] }) => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={80}
          outerRadius={110}
          strokeWidth={8}
          paddingAngle={10}
        >
            <Label
            content={({ viewBox }) => {
              const vb = viewBox as { cx: number; cy: number };
              if (vb && typeof vb.cx === 'number' && typeof vb.cy === 'number') {
                return (
                  <text x={vb.cx} y={vb.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={vb.cx} y={vb.cy} className="fill-foreground text-3xl font-black">4.2M</tspan>
                    <tspan x={vb.cx} y={vb.cy + 24} className="fill-muted-foreground text-xs font-bold">Active Voters</tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
};
