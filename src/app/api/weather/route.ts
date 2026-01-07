import { NextRequest, NextResponse } from 'next/server';
import { fetchWeatherForCoordinates } from '@/lib/weatherApi';
import { validateCoordinates } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    // Extract lat and lon from query parameters
    const searchParams = request.nextUrl.searchParams;
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');

    // Validate parameters exist
    if (!latParam || !lonParam) {
      return NextResponse.json(
        { error: 'Missing required parameters: lat and lon' },
        { status: 400 }
      );
    }

    // Parse to numbers
    const lat = parseFloat(latParam);
    const lon = parseFloat(lonParam);

    // Validate numbers
    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { error: 'Invalid coordinates: lat and lon must be valid numbers' },
        { status: 400 }
      );
    }

    // Validate coordinate ranges
    if (!validateCoordinates(lat, lon)) {
      return NextResponse.json(
        {
          error:
            'Invalid coordinate ranges: lat must be between -90 and 90, lon must be between -180 and 180',
        },
        { status: 400 }
      );
    }

    // Fetch weather data
    const weatherData = await fetchWeatherForCoordinates(lat, lon);

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
