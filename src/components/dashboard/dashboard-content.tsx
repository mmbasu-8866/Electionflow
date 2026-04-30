"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vote, ChevronRight, MessageSquare, BookOpen, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { VoterBotChatWidget } from "@/components/assistant/voter-bot-chat-widget";

export function DashboardContent() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-headline font-bold mb-4">Empowering your <span className="text-accent">Civic Journey</span></h2>
                <p className="text-muted-foreground text-lg max-w-lg mb-6">
                  Electionflow is your intelligent companion for navigating the complexities of the electoral process. 
                  Ask anything from registration deadlines to polling locations.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                    Get Started
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 border-accent/30 text-accent hover:bg-accent/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <Vote className="absolute -right-12 -bottom-12 h-64 w-64 text-primary/5 rotate-12" />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:border-accent/50 transition-colors group cursor-pointer" asChild>
              <Link href="/guides">
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Interactive Guides</CardTitle>
                  <CardDescription>Step-by-step walkthroughs for voter registration and ballot casting.</CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="hover:border-accent/50 transition-colors group cursor-pointer" asChild>
              <Link href="/timeline">
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Election Timeline</CardTitle>
                  <CardDescription>Never miss a deadline. Track important dates relevant to your area.</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </section>
        </div>

        <div className="lg:col-span-1 h-full">
          <Card className="h-full flex flex-col border-primary/20">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Assistant Chat
              </CardTitle>
              <CardDescription>Quick answers for election queries</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden relative min-h-[500px]">
              <VoterBotChatWidget />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
