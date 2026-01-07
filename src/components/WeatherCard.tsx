'use client';

import { WeatherCardData } from '@/types/weather';
import { getWeatherIconUrl } from '@/lib/utils';
import Image from 'next/image';

interface WeatherCardProps {
  data: WeatherCardData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const { cityName, weather, isCustom } = data;

  // Get the primary weather condition
  const weatherCondition = weather.weather[0];
  const iconUrl = getWeatherIconUrl(weatherCondition.icon);

  return (
    <div className="bg-card hover:bg-card-hover border border-border rounded-lg p-6 transition-smooth shadow-sm min-w-[250px]">
      {/* City name header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {isCustom ? '📍 Custom Location' : cityName}
        </h3>
        <Image
          src={iconUrl}
          alt={weatherCondition.description}
          width={50}
          height={50}
          unoptimized
        />
      </div>

      {/* Weather description */}
      <p className="text-text-secondary text-sm capitalize mb-4">
        {weatherCondition.description}
      </p>

      {/* Temperature section */}
      <div className="space-y-3">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-text-primary">
            {Math.round(weather.main.temp)}
          </span>
          <span className="text-2xl text-text-secondary ml-1">°C</span>
        </div>

        {/* Feels like temperature */}
        <div className="flex items-center text-sm">
          <span className="text-text-secondary">Feels like:</span>
          <span className="text-text-primary font-medium ml-2">
            {Math.round(weather.main.feels_like)}°C
          </span>
        </div>

        {/* Humidity */}
        <div className="flex items-center text-sm">
          <span className="text-text-secondary">Humidity:</span>
          <span className="text-text-primary font-medium ml-2">
            {weather.main.humidity}%
          </span>
        </div>
      </div>
    </div>
  );
}
