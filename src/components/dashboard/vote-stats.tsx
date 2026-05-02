"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

import { memo } from "react";

interface VoteStatsProps {
  percentage: number;
  totalVotes: string;
}

/**
 * VoteStats - Displays a radial progress chart of votes received.
 * Optimized with React.memo for high performance.
 */
export const VoteStats = memo(function VoteStats({ percentage, totalVotes }: VoteStatsProps) {
  return (
    <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden" role="status" aria-label={`Current vote count: ${percentage}% counted`}>
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
              data={[{ value: percentage, fill: "hsl(var(--primary))" }]}
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
            <span className="text-5xl font-black">{percentage}%</span>
            <span className="text-sm font-bold text-muted-foreground">{totalVotes} Votes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
