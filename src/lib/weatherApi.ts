import { WeatherResponse } from '@/types/weather';

/**
 * Fetch weather data for given coordinates from OpenWeather Current Weather API 2.5 (Free)
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns WeatherResponse with current weather data
 */
export async function fetchWeatherForCoordinates(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OPENWEATHER_API_KEY is not defined. Please add it to your .env.local file.'
    );
  }

  // Construct the API URL for Current Weather API 2.5 (Free)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenWeather API error (${response.status}): ${errorText}`
      );
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(
      `Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
