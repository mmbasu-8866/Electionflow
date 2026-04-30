"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Info, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const events = [
  { date: "Oct 15, 2024", title: "Registration Deadline", type: "Deadline", desc: "Last day to register to vote in the upcoming general election." },
  { date: "Oct 22, 2024", title: "Early Voting Starts", type: "Event", desc: "Designated polling centers open for early in-person voting." },
  { date: "Oct 29, 2024", title: "Mail-in Request Deadline", type: "Deadline", desc: "Final day to request an absentee or mail-in ballot." },
  { date: "Nov 05, 2024", title: "Election Day", type: "Election", desc: "General polls open from 7:00 AM to 8:00 PM." },
];

export default function TimelinePage() {
  const [filter, setFilter] = useState("");

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(filter.toLowerCase()) || 
    e.desc.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
        <h1 className="text-xl font-headline font-bold text-accent">Key Dates & Timeline</h1>
      </header>
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold">Election Cycle Tracker</h2>
              <p className="text-muted-foreground">Stay informed about critical dates and upcoming electoral events.</p>
            </div>
            <div className="w-full md:w-72">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter by keyword..." 
                  className="pl-10"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {filteredEvents.map((event, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shadow-lg shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-120">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm hover:border-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <time className="text-sm font-bold text-accent">{event.date}</time>
                    <Badge variant={event.type === 'Deadline' ? 'destructive' : 'secondary'}>{event.type}</Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-primary cursor-pointer hover:underline">
                    <Bell className="h-3 w-3" />
                    <span>Add to calendar</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary text-lg">
                <Info className="h-5 w-5" />
                Did you know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deadlines vary significantly by state and territory. Some regions allow same-day registration, while others require it up to 30 days in advance. Always verify with your local election board.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
