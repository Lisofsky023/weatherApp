import { City, WeatherData } from './weatherTypes';

export const localStorageService = {
  saveCities: (cities: City[]) => localStorage.setItem('citiesList', JSON.stringify(cities)),
  getCities: (): City[] => JSON.parse(localStorage.getItem('citiesList') || '[]'),
  saveCityWeather: (cityName: string, data: WeatherData) => localStorage.setItem(`weather_${cityName}`, JSON.stringify(data)),
  getCityWeather: (cityName: string): WeatherData => JSON.parse(localStorage.getItem(`weather_${cityName}`) || '{}'),
  removeCityWeather: (cityName: string) => localStorage.removeItem(`weather_${cityName}`)
};


