import { Geolocation } from '@capacitor/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}

const LocationService = {
  getCurrentLocation: async (): Promise<Location | undefined> => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
};

export default LocationService;