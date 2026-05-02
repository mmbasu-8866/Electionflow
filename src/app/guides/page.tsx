"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ArrowRight, UserPlus, FileText, Vote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const registrationSteps = [
  { title: "Check Eligibility", desc: "Ensure you meet age and citizenship requirements for your jurisdiction.", icon: CheckCircle2 },
  { title: "Gather Documents", desc: "Prepare valid ID, social security info, or proof of residence.", icon: FileText },
  { title: "Submit Form", desc: "Register online, by mail, or in person at your local election office.", icon: UserPlus },
  { title: "Confirm Status", desc: "Wait for your voter card or check your status online after 2 weeks.", icon: CheckCircle2 },
];

const votingSteps = [
  { title: "Find Polling Place", desc: "Locate your assigned station or verify early voting locations.", icon: Vote },
  { title: "Review Ballot", desc: "Study sample ballots to understand candidates and referendums.", icon: FileText },
  { title: "Cast Your Vote", desc: "Visit the polls on election day or mail in your absentee ballot.", icon: ArrowRight },
];

export default function GuidesPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6" role="banner">
        <h1 className="text-xl font-headline font-bold text-accent">Process Guides</h1>
      </header>
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6" role="main" aria-label="Election Process Guides">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold">Step-by-Step Election Instructions</h2>
            <p className="text-muted-foreground">Detailed navigable explanations for every stage of the election cycle.</p>
          </div>

          <Tabs defaultValue="registration" className="w-full">
            <TabsList className="bg-muted w-full max-w-md mb-8 p-1" aria-label="Process categories">
              <TabsTrigger value="registration" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">Registration</TabsTrigger>
              <TabsTrigger value="voting" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">Casting Ballot</TabsTrigger>
            </TabsList>

            <TabsContent value="registration" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" role="list" aria-label="Registration steps">
                {registrationSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${activeStep === idx ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground/30'}`}
                    onClick={() => setActiveStep(idx)}
                    role="listitem"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveStep(idx)}
                    aria-current={activeStep === idx ? 'step' : undefined}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeStep === idx ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>Step {idx + 1}</span>
                      {idx < activeStep ? <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" /> : <Circle className="h-4 w-4 text-muted-foreground/30" aria-hidden="true" />}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                  </div>
                ))}
              </div>

              <Card className="border-accent/20 bg-accent/5 overflow-hidden" aria-live="polite">
                <CardHeader className="bg-accent/10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center" aria-hidden="true">
                      {(() => {
                        const Icon = registrationSteps[activeStep].icon;
                        return <Icon className="h-6 w-6" />;
                      })()}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{registrationSteps[activeStep].title}</CardTitle>
                      <CardDescription>Deep dive into step {activeStep + 1} of the registration process.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <p className="text-lg leading-relaxed">{registrationSteps[activeStep].desc}</p>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h5 className="font-bold text-sm text-accent mb-2">Pro Tip</h5>
                    <p className="text-sm text-muted-foreground">Most states allow online registration through their Secretary of State website. Make sure you have your driver&apos;s license number ready!</p>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                    >
                      Previous Step
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setActiveStep(Math.min(registrationSteps.length - 1, activeStep + 1))}
                      disabled={activeStep === registrationSteps.length - 1}
                    >
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voting">
                <div className="grid gap-6">
                  {votingSteps.map((step, idx) => (
                    <Card key={idx} className="hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                            <CardDescription>{step.desc}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
