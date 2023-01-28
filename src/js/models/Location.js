// Responsible for maintaining location state. Location data caching, debouncing or Polling & search suggestions will be implemented in here post-mvp
import LocationAPI from '../api/LocationAPI';

function Location() {
  let currentLocation = null;
  const api = LocationAPI();

  const getLocation = async (query) => {
    // TODO: Check in cache first
    // TODO: Compare it with current location
    try {
      const locations = await api.fetchLocations(query);
      currentLocation = locations[0];
      return currentLocation;
    } catch (error) {
      return error;
    }
  };

  const getLocationString = ({ city, state, country }) => {
    return `${city}, ${state ? `${state}, ` : ''}${country}`;
  };

  return { getLocation, getLocationString };
}

export default Location;
