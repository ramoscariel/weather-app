'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface MapComponentProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

// Component to handle map click events
function MapClickHandler({
  onLocationSelect,
  setMarkerPosition,
}: {
  onLocationSelect: (lat: number, lon: number) => void;
  setMarkerPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });
  return null;
}

export default function MapComponent({ onLocationSelect }: MapComponentProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering map
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-96 w-full bg-card border border-border rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-text-secondary">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-border shadow-sm">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="h-full w-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler
          onLocationSelect={onLocationSelect}
          setMarkerPosition={setMarkerPosition}
        />
        {markerPosition && <Marker position={markerPosition} />}
      </MapContainer>
    </div>
  );
}
