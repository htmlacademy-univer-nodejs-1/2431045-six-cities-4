import { User } from '../user/user.type.js';
import { Amenity } from './amenity-type.enum.js';
import { ApartmentType } from './apartment-type.enum.js';
import { CityType } from './city-type.enum.js';

export type Offer = {
    title: string;
    description: string;
    date: Date;
    city: CityType;
    previewImage: string;
    photos: string[];
    premium: boolean;
    favorite: boolean;
    rating: number;
    housingType: ApartmentType;
    rooms: number;
    guests: number;
    price: number;
    amenities: Amenity[];
    author: User;
    commentsCount: number;
    latitude: number;
    longitude: number;
}
