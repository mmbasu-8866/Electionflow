"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function GeographicCoverage() {
  return (
    <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden h-[450px] relative">
      <CardHeader className="absolute top-0 left-0 z-10 bg-card/80 backdrop-blur-md w-full border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-primary">Geographic Coverage</CardTitle>
          <Badge className="bg-green-500/10 text-green-600 border-none">94.2% Counted</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
         <div className="w-full h-full bg-muted relative group">
            <Image 
              src="https://picsum.photos/seed/heatmap/1200/800" 
              alt="Interactive geographic heatmap showing voter turnout across Jawa Barat Region-1" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 1000px"
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
              priority
            />
            <div className="absolute top-1/2 left-1/3 h-48 w-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/4 left-1/2 h-32 w-32 bg-primary/30 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2">
              <div className="h-10 w-10 bg-white rounded-full p-2 shadow-2xl border-2 border-primary flex items-center justify-center">
                <div className="h-full w-full bg-[#E31E24] rounded-full" />
              </div>
            </div>
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <Button size="icon" variant="secondary" className="rounded-xl shadow-lg border" aria-label="Zoom in map">+</Button>
              <Button size="icon" variant="secondary" className="rounded-xl shadow-lg border" aria-label="Zoom out map">-</Button>
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
