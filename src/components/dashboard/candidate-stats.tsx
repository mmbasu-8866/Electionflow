"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";

interface Candidate {
  name: string;
  party: string;
  votes: string;
}

interface CandidateStatsProps {
  candidates: Candidate[];
}

/**
 * CandidateStats - Displays a list of top candidates.
 * Memoized to prevent re-renders when data hasn't changed.
 */
export const CandidateStats = memo(function CandidateStats({ candidates }: CandidateStatsProps) {
  return (
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
  );
});
