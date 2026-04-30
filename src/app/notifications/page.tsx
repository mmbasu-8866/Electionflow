
"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  { id: "1", title: "Karnataka Update", message: "Initial leads show Party A ahead by 15,000 votes in Bangalore Central.", type: "update", time: "2m ago" },
  { id: "2", title: "Poll Opening", message: "Polling stations in Region-4 are now operational. No delays reported.", type: "alert", time: "1h ago" },
  { id: "3", title: "New Result", message: "Constituency X has declared Candidate Y as the winner.", type: "result", time: "3h ago" },
];

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState(mockNotifications);

  useEffect(() => {
    // In production, we'd listen to the 'notifications' collection
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreAlerts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        setAlerts(firestoreAlerts);
      }
    });
    return () => unsubscribe();
  }, []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'result': return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'alert': return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      default: return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-white shadow-sm">
            <Bell className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-headline font-bold text-accent">Live Election Alerts</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black">Real-time Updates</h2>
                  <p className="text-muted-foreground">Stay informed with the latest constituency-level developments.</p>
                </div>
                <Badge variant="outline" className="animate-pulse bg-green-500/10 text-green-600 border-none">Live Monitoring</Badge>
              </div>

              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Card key={alert.id} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-6 p-6">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                          {getIcon(alert.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-black text-lg">{alert.title}</h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{alert.time || "Just Now"}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
                        </div>
                      </div>
                      <div className={`h-1.5 w-full ${alert.type === 'result' ? 'bg-green-500' : alert.type === 'alert' ? 'bg-orange-500' : 'bg-blue-500'} opacity-20`} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-[2.5rem] mt-12">
                <p className="text-sm">End of updates for the current session. New alerts will appear automatically.</p>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
