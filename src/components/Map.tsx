"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet icon paths
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customMarkerIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div class="custom-marker">🚨</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const resolvedMarkerIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div class="custom-marker" style="background-color: var(--accent); box-shadow: 0 0 15px var(--accent);">✅</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pendingMarkerIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div class="custom-marker" style="background-color: #f59e0b; box-shadow: 0 0 15px #f59e0b;">⏳</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export interface Problem {
  id: string;
  lat: number;
  lng: number;
  title: string;
  status: "pending" | "approved" | "resolved";
  points: number;
  author: string;
}

interface MapProps {
  problems: Problem[];
}

export default function Map({ problems }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-slate-900 animate-pulse"></div>;

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[40.4093, 49.8671]} // Default to Baku
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {problems.map((problem) => (
          <Marker
            key={problem.id}
            position={[problem.lat, problem.lng]}
            icon={
              problem.status === "resolved"
                ? resolvedMarkerIcon
                : problem.status === "pending"
                ? pendingMarkerIcon
                : customMarkerIcon
            }
          >
            <Popup className="glass-popup">
              <div className="p-2 text-slate-800">
                <h3 className="font-bold text-lg">{problem.title}</h3>
                <p className="text-sm">Status: <span className="font-semibold capitalize">{problem.status}</span></p>
                <p className="text-sm">Reporter: {problem.author}</p>
                <div className="mt-2 flex items-center gap-1 text-yellow-500 font-bold">
                  <span>🪙</span> +{problem.points} Microtokens
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
