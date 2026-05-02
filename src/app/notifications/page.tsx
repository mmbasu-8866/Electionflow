"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { PageContainer } from "@/components/layout/page-container";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'update' | 'alert' | 'result' | string;
  time?: string;
  timestamp?: unknown;
}

const mockNotifications: Notification[] = [
  { id: "1", title: "Karnataka Update", message: "Initial leads show Party A ahead by 15,000 votes in Bangalore Central.", type: "update", time: "2m ago" },
  { id: "2", title: "Poll Opening", message: "Polling stations in Region-4 are now operational. No delays reported.", type: "alert", time: "1h ago" },
  { id: "3", title: "New Result", message: "Constituency X has declared Candidate Y as the winner.", type: "result", time: "3h ago" },
];

/**
 * NotificationsPage - Live feed of election alerts and updates.
 */
export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreAlerts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Notification[];
        setAlerts(firestoreAlerts);
      }
    });
    return () => unsubscribe();
  }, []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'result': return <CheckCircle2 className="h-6 w-6 text-green-500" aria-hidden="true" />;
      case 'alert': return <AlertTriangle className="h-6 w-6 text-orange-500" aria-hidden="true" />;
      default: return <Info className="h-6 w-6 text-blue-500" aria-hidden="true" />;
    }
  };

  return (
    <PageContainer title="Live Election Alerts" icon={<Bell className="h-5 w-5" />}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black">Real-time Updates</h2>
            <p className="text-muted-foreground">Stay informed with the latest constituency-level developments.</p>
          </div>
          <Badge 
            variant="outline" 
            className="animate-pulse bg-green-500/10 text-green-600 border-none"
            role="status"
            aria-label="Live Monitoring Active"
          >
            Live Monitoring
          </Badge>
        </div>

        <div className="space-y-4" aria-live="polite">
          {alerts.map((alert) => (
            <Card key={alert.id} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-6 p-6">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center shrink-0" aria-hidden="true">
                    {getIcon(alert.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg">{alert.title}</h3>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{alert.time || "Just Now"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
                  </div>
                </div>
                <div className={`h-1.5 w-full ${alert.type === 'result' ? 'bg-green-500' : alert.type === 'alert' ? 'bg-orange-500' : 'bg-blue-500'} opacity-20`} aria-hidden="true" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-[2.5rem] mt-12">
          <p className="text-sm">End of updates for the current session. New alerts will appear automatically.</p>
        </div>
      </div>
    </PageContainer>
  );
}
