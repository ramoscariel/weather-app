/**
 * Validate latitude and longitude coordinates
 * @param lat - Latitude (-90 to 90)
 * @param lon - Longitude (-180 to 180)
 * @returns true if coordinates are valid
 */
export function validateCoordinates(lat: number, lon: number): boolean {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

/**
 * Get OpenWeather CDN icon URL for weather icon code
 * @param iconCode - Icon code from OpenWeather API (e.g., "10d")
 * @returns Full URL to the icon image
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
