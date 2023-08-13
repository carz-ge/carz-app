import {LocationObject} from 'expo-location';
import {getDistance} from 'geolib';
import {Coordinates} from '../graphql/operations';

export function calculateDistance(
  location: LocationObject | null,
  coordinates: Coordinates | undefined,
) {
  if (!location || !coordinates) {
    console.log('No Distance', location, coordinates);
    return null;
  }
  const distance = getDistance(
    location.coords,
    {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    1,
  );
  console.log('distance', distance);
  if (distance >= 1000) {
    return `${Math.round(distance / 1000)} კმ`;
  }
  return `${Math.round(distance)} მ`;
}
