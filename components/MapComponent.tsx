
import React, { useEffect, useRef } from 'react';
import { STRIPE_COUNTRIES, COLORS } from '../constants';
import { GatewayData } from '../types';

interface MapComponentProps {
  selectedGateway: GatewayData;
}

const MapComponent: React.FC<MapComponentProps> = ({ selectedGateway }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const geojsonLayerRef = useRef<any>(null);

  const getCountryColor = (name: string) => {
    // Normalize country names for matching
    let normalizedName = name;
    if (name === "United States of America") normalizedName = "United States";
    
    if (STRIPE_COUNTRIES.includes(normalizedName)) return COLORS.stripe;
    if (selectedGateway.countries.includes(normalizedName)) return COLORS.expansion;
    return COLORS.none;
  };

  const style = (feature: any) => ({
    fillColor: getCountryColor(feature.properties.name),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const L = (window as any).L;
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([20, 0], 2);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(mapInstanceRef.current);
      
      // Load GeoJSON
      fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
        .then(res => res.json())
        .then(data => {
          geojsonLayerRef.current = L.geoJson(data, { style }).addTo(mapInstanceRef.current);
        });
    }

    return () => {
      // Cleanup happens on unmount if needed
    };
  }, []);

  // Update map styles when selectedGateway changes
  useEffect(() => {
    if (geojsonLayerRef.current) {
      geojsonLayerRef.current.setStyle(style);
    }
  }, [selectedGateway]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-[1000] custom-legend pointer-events-none sm:pointer-events-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS.stripe }}></div>
            <span className="text-xs font-medium text-slate-700">Stripe Connect (Current)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS.expansion }}></div>
            <span className="text-xs font-medium text-slate-700">New Coverage Gained</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS.none }}></div>
            <span className="text-xs font-medium text-slate-700">No Coverage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
