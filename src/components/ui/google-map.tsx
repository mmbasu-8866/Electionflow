"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title: string }>;
  className?: string;
}

/**
 * GoogleMap - A high-performance wrapper for the Google Maps JavaScript API.
 * Features library lazy-loading and surgical marker updates to prevent full re-renders.
 * 
 * @param {GoogleMapProps} props - The component props.
 * @returns {JSX.Element} The rendered map container.
 */
export function GoogleMap({ center, zoom = 12, markers = [], className }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [error, setError] = useState<string | null>(() => {
    if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return "Google Maps API key is missing.";
    }
    return null;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Map
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || error) return;

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["maps", "marker"]
    });
    
    const initMap = async () => {
      try {
        if (!mapRef.current) return;

        // @ts-expect-error - compatibility with js-api-loader v2
        const google = await loader.load();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - google.maps.importLibrary might not be in all type definitions
        const { Map } = await google.maps.importLibrary("maps");
        
        googleMapRef.current = new Map(mapRef.current, {
          center,
          zoom,
          mapId: "ELECTION_FLOW_MAP_ID",
          disableDefaultUI: true,
          zoomControl: true,
        });

        setIsLoaded(true);
      } catch (e) {
        console.error("Map load error:", e);
        setError("Failed to load map");
      }
    };

    if (!googleMapRef.current) {
      initMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Update Markers
  useEffect(() => {
    if (!isLoaded || !googleMapRef.current) return;

    const updateMarkers = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - google.maps.importLibrary might not be in all type definitions
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        // Clear existing markers
        markersRef.current.forEach(m => m.map = null);
        markersRef.current = [];

        // Add new markers
        markers.forEach((m) => {
          const marker = new AdvancedMarkerElement({
            map: googleMapRef.current,
            position: { lat: m.lat, lng: m.lng },
            title: m.title,
          });
          markersRef.current.push(marker);
        });
      } catch (e) {
        console.error("Error updating markers:", e);
      }
    };

    updateMarkers();
  }, [isLoaded, markers]);

  // Update Center/Zoom
  useEffect(() => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter(center);
      googleMapRef.current.setZoom(zoom);
    }
  }, [center, zoom]);

  if (error) return <div className="flex items-center justify-center h-full bg-muted text-muted-foreground font-bold">{error}</div>;

  return (
    <div className="relative w-full h-full">
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse z-10">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Initializing Map...</span>
        </div>
      )}
      <div ref={mapRef} className={className} />
    </div>
  );
}
