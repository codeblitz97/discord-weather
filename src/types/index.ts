export type Query = string;
export interface Result {
  id?: string | undefined;
  name?: string | undefined;
}

export interface Divisions extends Result {
  url: string;
  country: string;
}

export interface Countries extends Result {
  url: string;
  region: string;
}

export interface SubDivisions extends Result {
  url: string;
  key: string;
  division: string;
}

export interface Regions extends Result {
  url: string;
}

export interface SearchResult extends Result {
  url?: string | undefined;
  name?: string | undefined;
  longName?: string | undefined;
}

export interface SearchResults {
  totalShowing: number;
  results: Array<SearchResult>;
}

export interface WeatherData {
  averageHi: string;
  averageLo: string;
  date: string;
  daylightIcon: string | undefined;
  nightIcon: string | undefined;
  summeryTextHi: string;
  summeryTextLo: string;
  currentWeather: {
    currentTime: string;
    currentWeatherIcon: string;
    currentTemperature: {
      currentTemperatureCelsius: number;
      currentTemperatureFahrenheit: number;
      averageFahrenheit: number;
    };
    currentTemperatureFull: {
      currentTemperatureFullCelsius: string;
      currentTemperatureFullFahrenheit: string;
      averageFullFahrenheit: string;
    };
    feelsLike: {
      feelsLikeCelsius: number;
      feelsLikeCelsiusFull: string;
    };
  };
}
