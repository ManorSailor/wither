import './css/styles.css';
import 'iconify-icon';
import LocationAPI from './js/api/LocationAPI';
import WeatherAPI from './js/api/WeatherAPI';

async function getUserQuery(query) {
  if (isValidQuery(query)) {
    try {
      const location = await LocationAPI.getLocation(query);
      const weather = await WeatherAPI.getWeather(location);
      console.log(weather);
    } catch (error) {
      console.log(error);
    }
  }
}

function isValidQuery(query) {
  return query && query.trim() !== '';
}

// Expose the function to the user for finding the weather
window.search = getUserQuery;
