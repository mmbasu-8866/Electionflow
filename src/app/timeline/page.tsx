"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

/**
 * TimelinePage - Key dates and deadlines for the election cycle.
 */
export default function TimelinePage() {
  const events = [
    { date: "Oct 1, 2023", title: "Voter Registration Opens", status: "completed" },
    { date: "Jan 15, 2024", title: "Candidate Filing Deadline", status: "completed" },
    { date: "Mar 5, 2024", title: "Primary Election Day", status: "completed" },
    { date: "Oct 7, 2024", title: "Voter Registration Deadline", status: "upcoming" },
    { date: "Oct 21, 2024", title: "Early Voting Begins", status: "upcoming" },
    { date: "Nov 5, 2024", title: "General Election Day", status: "upcoming" },
  ];

  return (
    <PageContainer title="Key Dates" maxWidth="max-w-3xl">
      <div className="space-y-4">
        <h2 className="text-3xl font-headline font-bold">Election Cycle Timeline</h2>
        <p className="text-muted-foreground">Stay on top of critical deadlines and events throughout the year.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {events.map((event, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {event.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-primary animate-pulse" />
              )}
            </div>
            {/* Card */}
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border shadow-sm group-hover:border-primary/50 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-primary uppercase tracking-widest">{event.date}</span>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <span className={`text-[10px] font-black uppercase tracking-wider w-fit px-2 py-0.5 rounded-full ${
                  event.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                }`}>
                  {event.status}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card className="rounded-[2.5rem] bg-primary text-primary-foreground shadow-xl shadow-primary/20">
        <CardContent className="p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <CalendarIcon className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black">Sync to Calendar</h3>
            <p className="text-sm opacity-80">Download the election schedule to your personal calendar to receive automated reminders for every deadline.</p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
