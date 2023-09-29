import { City, WeatherData } from './weatherTypes';

export const localStorageService = {
  // Метод для сохранения списка городов в localStorage
  saveCities: (cities: City[]) => localStorage.setItem('citiesList', JSON.stringify(cities)),

  // Метод для получения списка городов из localStorage
  getCities: (): City[] => JSON.parse(localStorage.getItem('citiesList') || '[]'),

  // Метод для сохранения погодных данных конкретного города в localStorage
  // Ключ для данных создается динамически на основе имени города
  saveCityWeather: (cityName: string, data: WeatherData) => localStorage.setItem(`weather_${cityName}`, JSON.stringify(data)),

  // Метод для получения погодных данных конкретного города из localStorage
  getCityWeather: (cityName: string): WeatherData => JSON.parse(localStorage.getItem(`weather_${cityName}`) || '{}'),

  // Метод для удаления погодных данных конкретного города из localStorage
  removeCityWeather: (cityName: string) => localStorage.removeItem(`weather_${cityName}`)
};









