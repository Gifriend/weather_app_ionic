import axios from 'axios';

const apiKey = '370d97aae9d141258d24e7f9d37659bc';
const openWeatherMapURL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  weather: { id: number, description: string }[];
  main: { temp: number };
  name: string;
}

const WeatherService = {
  getCityWeather: async (cityName: string): Promise<WeatherData | undefined> => {
    const url = `${openWeatherMapURL}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get<WeatherData>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching city weather:", error);
    }
  },

  getLocationWeather: async (lat: number, lon: number): Promise<WeatherData | undefined> => {
    const url = `${openWeatherMapURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get<WeatherData>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching location weather:", error);
    }
  },

  getWeatherIcon: (condition: number): string => {
    if (condition < 300) return '🌩';
    if (condition < 400) return '🌧';
    if (condition < 600) return '☔️';
    if (condition < 700) return '☃️';
    if (condition < 800) return '🌫';
    if (condition === 800) return '☀️';
    if (condition <= 804) return '☁️';
    return '🤷‍';
  },

  getMessage: (temp: number): string => {
    if (temp > 25) return "It's 🍦 time";
    if (temp > 20) return 'Time for shorts and 👕';
    if (temp < 10) return "You'll need 🧣 and 🧤";
    return 'Bring a 🧥 just in case';
  }
};

export default WeatherService;