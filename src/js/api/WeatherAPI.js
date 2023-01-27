// Acts as a common wrapper to get weather data
// Composite Pattern + Dependency Inversion because we do not want to rely on any API directly & want our app to treat all provider objects as the same
import OpenWeather from './providers/weather/OpenWeather';

function WeatherAPI() {
  const WeatherProvider = OpenWeather;

  const getWeather = async (location) => {
    const weather = await WeatherProvider
      .fetchWeather(location)
      .catch((error) => Promise.reject(error));

    return WeatherProvider.isValidData(weather)
      ? WeatherProvider.formatWeather(weather)
      : Promise.reject('Weather not found!');
  };

  return {
    getWeather,
  };
}

export default WeatherAPI;
