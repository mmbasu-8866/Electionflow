"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, UserCheck, Vote, ClipboardCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

/**
 * GuidesPage - Step-by-step instructions for election processes.
 */
export default function GuidesPage() {
  const steps = [
    {
      id: "step-1",
      title: "Voter Registration",
      icon: <UserCheck className="h-5 w-5" />,
      content: "Ensure you are registered to vote at least 30 days before the election. You can check your status online or at your local registrar's office."
    },
    {
      id: "step-2",
      title: "Research Candidates",
      icon: <BookOpen className="h-5 w-5" />,
      content: "Review candidate platforms, voting records, and endorsements. Use our 'Candidates' section to see live polling data and party affiliations."
    },
    {
      id: "step-3",
      title: "Locate Your Polling Place",
      icon: <ClipboardCheck className="h-5 w-5" />,
      content: "Use the 'Region Map' to find your assigned voting center and check real-time capacity and wait times."
    },
    {
      id: "step-4",
      title: "Cast Your Ballot",
      icon: <Vote className="h-5 w-5" />,
      content: "Bring a valid ID to your polling place. Follow the instructions provided by poll workers to ensure your vote is counted correctly."
    }
  ];

  return (
    <PageContainer title="Process Guides" maxWidth="max-w-4xl">
      <div className="space-y-4">
        <h2 className="text-3xl font-headline font-bold">How to Vote: A Step-by-Step Guide</h2>
        <p className="text-muted-foreground">Clear instructions to ensure your voice is heard in the upcoming election.</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {steps.map((step) => (
          <AccordionItem key={step.id} value={step.id} className="border rounded-2xl px-6 bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <span className="text-lg font-bold">{step.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed text-base">
              {step.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="rounded-[2rem] border-dashed border-2 bg-muted/30">
        <CardContent className="p-8 text-center space-y-2">
          <h3 className="font-bold text-lg">Still have questions?</h3>
          <p className="text-sm text-muted-foreground">Ask our AI-powered Election Assistant for personalized advice based on your location and specific situation.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
