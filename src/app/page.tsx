import { parseCiudadesFile } from '@/lib/cityParser';
import { fetchWeatherForCoordinates } from '@/lib/weatherApi';
import { WeatherCardData } from '@/types/weather';
import WeatherGrid from '@/components/WeatherGrid';
import path from 'path';

export default async function Home() {
  let defaultWeatherData: WeatherCardData[] = [];
  let error: string | null = null;

  try {
    // Read and parse the ciudades.txt file
    const ciudadesPath = path.join(process.cwd(), 'ciudades.txt');
    const cities = parseCiudadesFile(ciudadesPath);

    // Fetch weather for all cities in parallel
    const weatherPromises = cities.map(async (city) => {
      const weather = await fetchWeatherForCoordinates(city.lat, city.lon);
      return {
        cityName: city.name,
        weather,
        isCustom: false,
      };
    });

    defaultWeatherData = await Promise.all(weatherPromises);
  } catch (err) {
    console.error('Error loading default weather data:', err);
    error = err instanceof Error ? err.message : 'Failed to load weather data';
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Weather Dashboard
          </h1>
          <p className="text-text-secondary">
            View current weather for predefined cities or select a custom location on the map
          </p>
        </header>

        {/* Error message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-red-600 text-sm mt-2">
              Please make sure you have set OPENWEATHER_API_KEY in your .env.local file.
            </p>
          </div>
        )}

        {/* Weather grid with map */}
        {!error && <WeatherGrid defaultWeatherData={defaultWeatherData} />}
      </div>
    </main>
  );
}
