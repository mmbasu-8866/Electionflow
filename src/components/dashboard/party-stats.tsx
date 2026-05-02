"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { memo } from "react";

interface PartyData {
  name: string;
  votes: string;
  color: string;
}

interface PartyStatsProps {
  data: PartyData[];
}

/**
 * PartyStats - Displays top political parties.
 * Memoized for high performance.
 */
export const PartyStats = memo(function PartyStats({ data }: PartyStatsProps) {
  return (
    <Card className="rounded-[2.5rem] border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Top Party</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((party, idx) => (
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
  );
});
