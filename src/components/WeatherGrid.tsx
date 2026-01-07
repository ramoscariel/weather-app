'use client';

import { useState } from 'react';
import { WeatherCardData, WeatherResponse } from '@/types/weather';
import WeatherCard from './WeatherCard';
import dynamic from 'next/dynamic';

// Dynamic import for MapComponent (client-side only, no SSR)
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-card border border-border rounded-lg animate-pulse flex items-center justify-center">
      <span className="text-text-secondary">Loading map...</span>
    </div>
  ),
});

interface WeatherGridProps {
  defaultWeatherData: WeatherCardData[];
}

export default function WeatherGrid({ defaultWeatherData }: WeatherGridProps) {
  const [customWeather, setCustomWeather] = useState<WeatherResponse | null>(null);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = async (lat: number, lon: number) => {
    setIsLoadingCustom(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }

      const data: WeatherResponse = await response.json();
      setCustomWeather(data);
    } catch (err) {
      console.error('Error fetching custom location weather:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setCustomWeather(null);
    } finally {
      setIsLoadingCustom(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Map section */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Select Custom Location
        </h2>
        <MapComponent onLocationSelect={handleLocationSelect} />
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        )}
      </section>

      {/* Weather cards grid */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Current Weather
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default city weather cards */}
          {defaultWeatherData.map((data) => (
            <WeatherCard key={data.cityName} data={data} />
          ))}

          {/* Custom location weather card */}
          {isLoadingCustom && (
            <div className="bg-card border border-border rounded-lg p-6 min-w-[250px] animate-pulse">
              <div className="h-6 bg-border rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-border rounded mb-4 w-1/2"></div>
              <div className="h-12 bg-border rounded mb-3 w-1/3"></div>
              <div className="h-4 bg-border rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-border rounded w-1/2"></div>
            </div>
          )}

          {customWeather && !isLoadingCustom && (
            <WeatherCard
              data={{
                cityName: 'Custom Location',
                weather: customWeather,
                isCustom: true,
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
