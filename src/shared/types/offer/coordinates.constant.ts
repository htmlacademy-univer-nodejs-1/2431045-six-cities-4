import { Coordinates } from './coordinates.type.js';
import { CityType } from './city-type.enum.js'

export const COORDINATES_BY_CITY : Record<CityType, Coordinates> = {
  [CityType.Paris]: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  [CityType.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [CityType.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [CityType.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [CityType.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [CityType.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
};