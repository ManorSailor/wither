// Acts as a common wrapper to get location data
// Composite Pattern + Dependency Inversion because we do not want to rely on any API directly & want our app to treat all provider objects as the same
import OpenWeather from './providers/location/OpenWeather';

function LocationAPI() {
  let LocationProvider = OpenWeather;

  const fetchLocations = async (location) => {
    const locations = await LocationProvider
      .fetchLocations(location)
      .catch((error) => Promise.reject(error));

    return LocationProvider.isDataValid(locations)
      ? LocationProvider.formatLocation(locations)
      : Promise.reject('Location not found!');
  };

  return { fetchLocations };
}

export default LocationAPI;
