import { readFileSync } from 'fs';
import { City } from '@/types/city';

/**
 * Parse coordinate string to decimal number
 * @param value - Coordinate value (e.g., "0.2233")
 * @param direction - Direction letter (N, S, E, W)
 * @returns Decimal coordinate (S and W are negative)
 */
function parseCoordinate(value: string, direction: string): number {
  const num = parseFloat(value);
  // South and West are negative
  return (direction === 'S' || direction === 'W') ? -num : num;
}

/**
 * Parse ciudades.txt file to extract city information
 * @param filePath - Path to ciudades.txt file
 * @returns Array of City objects
 *
 * Expected format: "Quito=0.2233° S, 78.5141° W"
 */
export function parseCiudadesFile(filePath: string): City[] {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');

    const cities: City[] = [];

    for (const line of lines) {
      // Remove leading/trailing whitespace
      const trimmedLine = line.trim();

      // Split by '=' to separate name from coordinates
      const parts = trimmedLine.split('=');
      if (parts.length !== 2) continue;

      const name = parts[0].trim();
      const coordsString = parts[1].trim();

      // Parse coordinates: "0.2233° S, 78.5141° W"
      // Split by comma to get lat and lon
      const coordParts = coordsString.split(',');
      if (coordParts.length !== 2) continue;

      // Parse latitude: "0.2233° S"
      const latMatch = coordParts[0].trim().match(/([0-9.]+)°\s*([NSEW])/);
      if (!latMatch) continue;
      const lat = parseCoordinate(latMatch[1], latMatch[2]);

      // Parse longitude: "78.5141° W"
      const lonMatch = coordParts[1].trim().match(/([0-9.]+)°\s*([NSEW])/);
      if (!lonMatch) continue;
      const lon = parseCoordinate(lonMatch[1], lonMatch[2]);

      cities.push({ name, lat, lon });
    }

    return cities;
  } catch (error) {
    console.error('Error parsing ciudades file:', error);
    throw new Error(`Failed to parse ciudades file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
