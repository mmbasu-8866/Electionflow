"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Info, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { GoogleMap } from "@/components/ui/google-map";

const votingCenters = [
  { id: 1, name: "Central High School Gym", address: "123 Democracy Ave, West District", status: "Open", capacity: "85%", lat: -6.9175, lng: 107.6191 },
  { id: 2, name: "Public Library Wing B", address: "456 Civic Center Plaza", status: "Open", capacity: "40%", lat: -6.9205, lng: 107.6251 },
  { id: 3, name: "Community Center Hall", address: "789 Unity Road, East Side", status: "Closed", capacity: "0%", lat: -6.9145, lng: 107.6101 },
  { id: 4, name: "St. Mary's Parish Hall", address: "101 Liberty St, North Point", status: "Open", capacity: "65%", lat: -6.9255, lng: 107.6151 },
];

export default function RegionPage() {
  const mapCenter = { lat: -6.9175, lng: 107.6191 }; // Bandung center
  const markers = votingCenters.map(c => ({ lat: c.lat, lng: c.lng, title: c.name }));

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
        <h1 className="text-xl font-headline font-bold text-accent">Region & Voting Centers</h1>
      </header>
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-[1600px] mx-auto space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map View */}
            <Card className="lg:col-span-2 rounded-[2.5rem] border shadow-sm overflow-hidden min-h-[500px] relative group">
               <GoogleMap 
                 center={mapCenter} 
                 markers={markers} 
                 className="absolute inset-0 w-full h-full"
                 zoom={13}
               />
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <Badge className="bg-primary text-white text-xs px-3 py-1 rounded-full shadow-lg">Live Interactive Map</Badge>
              </div>
              
              <CardHeader className="absolute bottom-0 left-0 w-full p-8 z-10 bg-gradient-to-t from-background/90 to-transparent">
                <CardTitle className="text-foreground text-3xl font-black drop-shadow-sm">Daerah Pemilihan Jabar-1</CardTitle>
                <p className="text-muted-foreground font-bold">Interactive Region Coverage & Live Center Status</p>
              </CardHeader>
            </Card>

            {/* Centers List */}
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  placeholder="Search centers..." 
                  aria-label="Search voting centers by name or address"
                  className="pl-10 h-12 rounded-2xl bg-card border-muted" 
                />
              </div>
              
              <div className="space-y-4" role="region" aria-label="Local Voting Centers List">
                <h3 className="font-bold text-lg text-primary px-2">Local Voting Centers</h3>
                {votingCenters.map((center) => (
                  <Card key={center.id} className="rounded-3xl border hover:border-primary/50 transition-all group cursor-pointer" role="listitem">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Navigation className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold">{center.name}</h4>
                          <Badge variant={center.status === 'Open' ? 'default' : 'secondary'} className="text-[10px] h-5">
                            {center.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{center.address}</p>
                        <div className="pt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: center.capacity }} 
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground">{center.capacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Card className="rounded-[2.5rem] bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent text-lg">
                <span className="h-5 w-5"><Info /></span>
                Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Wait times are estimated based on real-time ballot submissions and digital check-ins. For technical issues at any center, please contact the regional coordinator.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
