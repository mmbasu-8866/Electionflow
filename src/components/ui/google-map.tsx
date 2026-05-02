"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title: string }>;
  className?: string;
}

export function GoogleMap({ center, zoom = 12, markers = [], className }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    
    const loadMap = async () => {
      try {
        if (!mapRef.current) return;

        // @ts-ignore - for v2 compatibility
        const { Map } = await importLibrary("maps", { apiKey, version: "weekly" }) as google.maps.MapsLibrary;
        // @ts-ignore
        const { AdvancedMarkerElement } = await importLibrary("marker", { apiKey, version: "weekly" }) as google.maps.MarkerLibrary;

        const map = new Map(mapRef.current, {
          center,
          zoom,
          mapId: "ELECTION_FLOW_MAP_ID",
        });

        markers.forEach((m) => {
          new AdvancedMarkerElement({
            map,
            position: { lat: m.lat, lng: m.lng },
            title: m.title,
          });
        });
      } catch (e) {
        console.error("Map load error:", e);
        setError("Failed to load map");
      }
    };

    loadMap();
  }, [center, zoom, markers]);

  if (error) return <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">{error}</div>;

  return <div ref={mapRef} className={className} />;
}
