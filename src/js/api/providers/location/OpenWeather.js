// API specific implementation with an adapter method to adapt data according to our app's need
// Singleton + Adapter pattern
import { fetchData } from '../../../utils';

const OpenWeather = (() => {
  const LIMIT = 8;
  const KEY = 'bcb623dd560f25e7471cc8e69b50ce19';

  const fetchLocations = (location) =>
    fetchData(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${LIMIT}&appid=${KEY}`
    );

  const isDataValid = (locations) => {
    return Boolean(locations?.length);
  };

  const formatLocation = (locations) => {
    return locations?.reduce(
      (formattedLocations, { lat, lon, name: city, state, country }) => {
        formattedLocations.push({
          lat,
          lon,
          city,
          state,
          country,
        });

        return formattedLocations;
      },
      []
    );
  };

  return { fetchLocations, formatLocation, isDataValid };
})();

export default OpenWeather;
