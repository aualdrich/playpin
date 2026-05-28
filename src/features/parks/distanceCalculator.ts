import type { Coordinate } from "./parkData";

const EARTH_RADIUS_MILES = 3958.8;

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function calculateDistanceInMiles(
  from: Coordinate,
  to: Coordinate,
): number {
  const latitudeDelta = degreesToRadians(to.latitude - from.latitude);
  const longitudeDelta = degreesToRadians(to.longitude - from.longitude);
  const fromLatitude = degreesToRadians(from.latitude);
  const toLatitude = degreesToRadians(to.latitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    2 * EARTH_RADIUS_MILES * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}
