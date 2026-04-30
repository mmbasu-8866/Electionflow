"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Info, HelpCircle } from "lucide-react";
import { useState, useMemo } from "react";

const glossaryTerms = [
  { term: "Absentee Ballot", def: "A ballot cast by someone who is unable or unwilling to attend the official polling station to which they are normally allocated." },
  { term: "Canvassing", def: "The process of systematically contacting individuals to solicit their votes or gather information during a political campaign." },
  { term: "Electoral College", def: "A body of people representing the states of the US, who formally cast votes for the election of the president and vice president." },
  { term: "Gerrymander", def: "To manipulate the boundaries of (an electoral constituency) so as to favor one party or class." },
  { term: "Incumbent", def: "The current holder of an office or post." },
  { term: "Primary Election", def: "An election to appoint delegates to a party conference or to select the candidates for a principal, especially presidential, election." },
  { term: "Referendum", def: "A general vote by the electorate on a single political question which has been referred to them for a direct decision." },
  { term: "Super Tuesday", def: "A day on which several US states hold primary elections." },
  { term: "Voter Suppression", def: "Any effort to discourage or prevent specific groups of people from voting." },
  { term: "Write-in Candidate", def: "A candidate whose name does not appear on the ballot but for whom voters may vote by writing in the person's name." },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState("");

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(t => 
      t.term.toLowerCase().includes(search.toLowerCase()) || 
      t.def.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => a.term.localeCompare(b.term));
  }, [search]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <h1 className="text-xl font-headline font-bold text-accent">Election Glossary</h1>
          </header>
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-3xl font-headline font-bold">Terminology & Concepts</h2>
                <p className="text-muted-foreground">Demystifying electoral jargon to help you navigate the voting process with confidence.</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search terms or definitions..." 
                    className="pl-12 h-14 text-lg rounded-2xl bg-muted/50 focus:bg-background transition-colors border-muted"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((item, idx) => (
                    <Card key={idx} className="hover:border-accent/30 transition-all group border-muted bg-card/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-primary group-hover:text-accent transition-colors flex items-center justify-between">
                          {item.term}
                          <HelpCircle className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.def}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center space-y-4">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">No terms found</h3>
                    <p className="text-muted-foreground">Try searching for something else, like "Referendum" or "Ballot".</p>
                  </div>
                )}
              </div>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent text-lg">
                    <Info className="h-5 w-5" />
                    Need more help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    If you encounter a term not listed here, try asking our AI Assistant on the dashboard for a real-time explanation tailored to your context.
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
