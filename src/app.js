import './css/styles.css';
import 'iconify-icon';
import LocationAPI from './js/api/LocationAPI';
import WeatherAPI from './js/api/WeatherAPI';
import { isValidValue } from './js/utils';

async function getUserQuery(query) {
  if (isValidValue(query)) {
    try {
      const location = await LocationAPI.getLocation(query);
      const weather = await WeatherAPI.getWeather(location);
      console.log(weather);
    } catch (error) {
      console.log(error);
    }
  }
}

// Expose the function to the user for finding the weather
window.search = getUserQuery;
