# Weather Dashboard

A NextJS application that displays current weather information from OpenWeather API for predefined cities and allows users to select custom locations via an interactive world map.

## Features

- Display weather for 5 predefined cities (Quito, Guayaquil, Cuenca, Miami, Los Angeles)
- Interactive Leaflet map for selecting custom locations
- Real-time weather data from OpenWeather OneCall API 3.0
- Modern gray-themed UI built with Tailwind CSS
- TypeScript for type safety
- ESLint with security plugins (eslint-plugin-security, eslint-plugin-no-unsanitized)

## Prerequisites

- Node.js 18+
- npm or yarn
- OpenWeather API key (free tier available at https://openweathermap.org/api)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.template .env.local
```

Edit `.env.local` and add your OpenWeather API key:

```
OPENWEATHER_API_KEY=your_actual_api_key_here
```

To get a free API key:
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── api/weather/route.ts    # API route for custom locations
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main dashboard page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── WeatherCard.tsx         # Weather card component
│   │   ├── WeatherGrid.tsx         # Grid with state management
│   │   └── MapComponent.tsx        # Leaflet map component
│   ├── lib/
│   │   ├── cityParser.ts           # Parse ciudades.txt
│   │   ├── weatherApi.ts           # OpenWeather API client
│   │   └── utils.ts                # Helper functions
│   └── types/
│       ├── city.ts                 # City types
│       └── weather.ts              # Weather types
├── ciudades.txt                    # Predefined cities with coordinates
├── .eslintrc.json                  # ESLint config with security plugins
├── tailwind.config.ts              # Tailwind config with gray theme
└── tsconfig.json                   # TypeScript config
```

## Technology Stack

- **Framework**: NextJS 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS
- **Map**: Leaflet + react-leaflet
- **API**: OpenWeather OneCall API 3.0
- **Linting**: ESLint with security plugins

## Security

This project includes ESLint security plugins:
- `eslint-plugin-security` - Detects security vulnerabilities
- `eslint-plugin-no-unsanitized` - Prevents XSS attacks

Run linting:
```bash
npm run lint
```

## Usage

1. **View default cities**: The dashboard displays weather for 5 predefined cities on load
2. **Select custom location**: Click anywhere on the map to add a custom location weather card
3. **Weather data**: Each card shows:
   - Current temperature (°C)
   - Feels like temperature
   - Humidity percentage
   - Weather condition with icon

## API Endpoints

### GET /api/weather

Fetch weather for custom coordinates.

**Query Parameters:**
- `lat` (required): Latitude (-90 to 90)
- `lon` (required): Longitude (-180 to 180)

**Example:**
```
GET /api/weather?lat=40.7128&lon=-74.0060
```

## Troubleshooting

### Map not rendering
- Check browser console for errors
- Ensure Leaflet CSS is imported in globals.css
- Verify marker assets are in public/ folder

### API errors
- Verify OPENWEATHER_API_KEY is set in .env.local
- Check API key is valid and active
- Ensure you're not exceeding API rate limits (60 calls/min for free tier)

### Build errors
- Run `npm run lint` to check for issues
- Ensure all dependencies are installed
- Check TypeScript errors with `npx tsc --noEmit`

## License

MIT
