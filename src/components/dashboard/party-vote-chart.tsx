"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface PartyData {
  name: string;
  votes: number;
  color: string;
}

export const PartyVoteChart = ({ data }: { data: PartyData[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
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
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
