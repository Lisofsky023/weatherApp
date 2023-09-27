export interface WeatherData {
  location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
  };
  current: {
      temp_c: number;
      condition: {
          text: string;
          icon: string;
          code: number;
      };
      humidity: number;
      wind_kph: number;
  };
}

export interface Suggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface City extends Suggestion {
  id: number;
  weatherData?: WeatherData;
}

