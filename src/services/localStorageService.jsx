export const localStorageService = {
  saveCities: (cities) => localStorage.setItem('citiesList', JSON.stringify(cities)),
  getCities: () => JSON.parse(localStorage.getItem('citiesList') || '[]'),
  saveCityWeather: (cityName, data) => localStorage.setItem(`weather_${cityName}`, JSON.stringify(data)),
  getCityWeather: (cityName) => JSON.parse(localStorage.getItem(`weather_${cityName}`) || '{}'),
  removeCityWeather: (cityName) => localStorage.removeItem(`weather_${cityName}`)
};


