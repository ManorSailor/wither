// API specific implementation with an adapter method to adapt data according to our app's need
// Singleton + Adapter pattern
import { fetchData, formatDate } from '../../../utils';

const OpenWeather = (() => {
  const KEY = '49257f6591cfc3ed8daf0b5970d519cb';

  const fetchWeather = ({ lat, lon }) =>
    fetchData(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&exclude=hourly,minutely,alerts`
    );

  const isValidData = (weather) => {
    return Boolean(weather.cod !== '400');
  };

  // Adapt API data into a format our app expects
  const formatWeather = ({
    current: { temp, humidity, visibility, weather, feels_like, wind_speed },
    daily,
  }) => {
    const current = {
      temp,
      humidity,
      visibility,
      dateTime: formatDate(new Date()),
      feelsLike: feels_like,
      windSpeed: wind_speed,
      weather: weather[0]?.description,
      weatherGroup: weather[0]?.main,
      weatherIcon: weather[0]?.icon,
      weatherID: weather[0]?.id,
    };

    const weekly = daily?.reduce(
      (next7Days, { temp, weather, dt, wind_speed }) => {
        const formattedDay = {
          date: formatDate(dt, 'MMM do'),
          tempMin: temp.min,
          tempMax: temp.max,
          windSpeed: wind_speed,
          weather: weather[0]?.description,
          weatherGroup: weather[0]?.main,
          weatherIcon: weather[0]?.icon,
          weatherID: weather[0]?.id,
        };

        next7Days.push(formattedDay);

        return next7Days;
      },
      []
    );

    return { current, weekly, units: 'metric' };
  };

  return { fetchWeather, formatWeather, isValidData };
})();

export default OpenWeather;
