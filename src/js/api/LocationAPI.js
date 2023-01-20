// Acts as a common wrapper to get location data
// Composite Pattern + Dependency Inversion because we do not want to rely on any API directly & want our app to treat all provider objects as the same
import GeoCodeAPI from './providers/GeoCodeAPI';

function LocationAPI() {
  let LocationProvider = GeoCodeAPI;

  const getLocation = async (location) => {
    const locations = await LocationProvider
      .fetchLocations(location)
      .catch((error) => Promise.reject(error));

    return LocationProvider.isDataValid(locations)
      ? locations[0]
      : Promise.reject('Location not found!');
  };

  return {
    getLocation,
  };
}

export default LocationAPI();
