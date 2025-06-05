import { Amenity } from './offer/amenity-type.enum.js';
import { ApartmentType } from './offer/apartment-type.enum.js';
import { CityType } from './offer/city-type.enum.js';
import { User } from './user/user.type.js';

export type MockServerData = {
    titles: string[];
    descriptions: string[];
    dates: Date[];
    cities: CityType[];
    previewImages: string[];
    photos:string[][];
    premium: boolean[];
    favorite: boolean[];
    ratings: number[];
    housingTypes: ApartmentType[];
    rooms: number[];
    guests: number[];
    prices: number[];
    amenities: Array<Amenity>[];
    users: User[];
    commentsCounts: number[];
    coordinates: { latitude: number; longitude: number }[];
  };
