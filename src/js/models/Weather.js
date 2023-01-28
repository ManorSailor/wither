// Responsible for maintaining weather state. Weather data caching (maybe not), debouncing or Polling will be implemented in here post-mvp
import WeatherAPI from '../api/WeatherAPI';

function Weather() {
  let currentLocationWeather = null;
  const api = WeatherAPI();

  const getWeather = async (location) => {
    try {
      const weather = await api.getWeather(location);
      currentLocationWeather = weather;
      return currentLocationWeather;
    } catch (error) {
      return error;
    }
  };

  const toMetric = ({ current, weekly, ...rest }) => {
    const ftoc = (temp) => ((temp - 32) * 5) / 9;

    current.temp = ftoc(current.temp);
    weekly?.forEach((day) => {
      day.tempMin = ftoc(day.tempMin);
      day.tempMax = ftoc(day.tempMax);
    });

    return {
      current,
      weekly,
      ...rest,
    };
  };

  const toImperial = ({ current, weekly, ...rest }) => {
    const ctof = (temp) => (temp * 9) / 5 + 32;

    current.temp = ctof(current.temp);
    weekly?.forEach((day) => {
      day.tempMin = ctof(day.tempMin);
      day.tempMax = ctof(day.tempMax);
    });

    return {
      current,
      weekly,
      ...rest,
    };
  };

  return { getWeather, toMetric, toImperial };
}

export default Weather;
