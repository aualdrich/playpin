import { calculateDistanceInMiles } from "./distanceCalculator";
import { PARKS, type Coordinate, type Park } from "./parkData";

export type ParkWithDistance = Park & {
  distanceMiles: number;
};

export function getParksByDistance(location: Coordinate): ParkWithDistance[] {
  return PARKS.map((park) => ({
    ...park,
    distanceMiles: calculateDistanceInMiles(location, park.coordinate),
  })).sort((firstPark, secondPark) => firstPark.distanceMiles - secondPark.distanceMiles);
}
