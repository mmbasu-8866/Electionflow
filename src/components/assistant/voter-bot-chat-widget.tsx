
"use client";

import { useState, useRef, useEffect } from "react";
import { electionProcessChat } from "@/ai/flows/election-process-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, User, Bot, MapPin, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Message = {
  role: "user" | "bot";
  content: string;
};

export function VoterBotChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm Electionflow. How can I help you today? I can also explain things simply for kids!" }
  ]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEli10, setIsEli10] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await electionProcessChat({ 
        query: userMessage, 
        location: location.trim() || undefined,
        mode: isEli10 ? 'eli10' : 'standard'
      });
      setMessages(prev => [...prev, { role: "bot", content: response.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[700px]">
      <div className="p-3 bg-muted/20 border-b space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
          <Input 
            placeholder="Set location (optional)..." 
            aria-label="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-8 text-xs bg-background border-muted"
          />
        </div>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
             <HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" />
             <Label htmlFor="eli10-mode" className="text-[10px] font-black uppercase tracking-wider">Explain Like I'm 10</Label>
          </div>
          <Switch 
            id="eli10-mode" 
            checked={isEli10} 
            onCheckedChange={setIsEli10}
            className="scale-75"
            aria-label="Toggle Explain Like I'm 10 mode"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef} aria-live="polite" aria-relevant="additions">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={cn(
                "flex gap-3",
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              )} aria-hidden="true">
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={cn(
                "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                m.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-muted border border-border rounded-tl-none"
              )}>
                <span className="sr-only">{m.role === "user" ? "You" : "VoterBot"}: </span>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3" role="status">
              <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0" aria-hidden="true">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-muted border border-border rounded-2xl rounded-tl-none p-3 text-sm text-muted-foreground italic">
                Analyzing trends...
              </div>
              <span className="sr-only">Bot is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background mt-auto">
        <div className="flex gap-2">
          <Input 
            placeholder={isEli10 ? "Ask a simple question..." : "Ask about trends, Karnataka leads..."} 
            aria-label="Chat message input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="rounded-full bg-muted/50 border-muted"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
