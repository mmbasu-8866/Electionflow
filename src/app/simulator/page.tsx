"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, ChartBar, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { collection, addDoc, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const demoCandidates = [
  { id: "c1", name: "Modern Progressive Alliance", party: "MPA", color: "bg-blue-500" },
  { id: "c2", name: "Traditional Values Party", party: "TVP", color: "bg-red-500" },
  { id: "c3", name: "Green Future Initiative", party: "GFI", color: "bg-green-500" },
];

export default function SimulatorPage() {
  const { user } = useAuth();
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "simulatedVotes"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        counts[data.candidateId] = (counts[data.candidateId] || 0) + 1;
      });
      setVotes(counts);
      setTotalVotes(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  const handleVote = async (candidateId: string) => {
    if (!user) {
      toast({ title: "Auth Required", description: "Please sign in to participate in the simulation.", variant: "destructive" });
      return;
    }
    if (hasVoted) {
      toast({ title: "Already Voted", description: "You can only cast one simulation vote." });
      return;
    }

    try {
      await addDoc(collection(db, "simulatedVotes"), {
        candidateId,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      setHasVoted(true);
      toast({ title: "Vote Cast!", description: "Your simulated vote has been recorded." });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-white">
        <h1 className="text-xl font-headline font-bold text-accent">Mock Voting Simulator</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-2 text-center">
            <Badge variant="secondary" className="mb-2">Experimental Feature</Badge>
            <h2 className="text-4xl font-black">Experience the Voting Process</h2>
            <p className="text-muted-foreground">This is a non-binding simulation to help you understand how digital voting and counting works.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoCandidates.map((c) => {
              const count = votes[c.id] || 0;
              const percent = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
              
              return (
                <Card key={c.id} className="rounded-3xl border-2 hover:border-primary/40 transition-all overflow-hidden">
                  <div className={`h-2 ${c.color}`} />
                  <CardHeader>
                    <CardTitle className="text-lg">{c.name}</CardTitle>
                    <CardDescription>{c.party}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>LIVE COUNT</span>
                        <span>{count} Votes ({percent.toFixed(1)}%)</span>
                      </div>
                      <Progress value={percent} className="h-2" />
                    </div>
                    <Button 
                      className="w-full rounded-full gap-2 font-black" 
                      variant={hasVoted ? "secondary" : "default"}
                      disabled={hasVoted}
                      onClick={() => handleVote(c.id)}
                    >
                      <Vote className="h-4 w-4" />
                      {hasVoted ? "Voted" : "Cast Vote"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="rounded-[2.5rem] bg-primary/5 border-primary/20">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 rounded-3xl bg-primary text-white flex items-center justify-center shrink-0">
                <ChartBar className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black">Real-time Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  Our platform uses Firebase real-time listeners. As soon as a user clicks "Cast Vote", the results update instantly for everyone connected to the dashboard.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted p-6 rounded-3xl border border-dashed flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div className="text-sm">
              <span className="font-bold">Security Notice:</span> In a real election, votes are encrypted and anonymized. This simulator demonstrates the logic of counting, not the full cryptographic security of official ballot systems.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
