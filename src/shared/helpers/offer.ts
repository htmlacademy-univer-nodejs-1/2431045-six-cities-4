import { Amenity, ApartmentType, CityType, Offer, User} from '../types/index.js';
import { Coordinates } from '../types/offer/coordinates.type.js';
import { UserType } from '../types/user/user-type.enum.js';
import { getEnumKeyByValue } from './common.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    previewImage,
    photos,
    premium,
    favorite,
    rating,
    apartmentType,
    rooms,
    guests,
    price,
    amenities,
    author,
    commentsCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  const parsedAuthor = JSON.parse(author);

  const apartmentTypeKey = getEnumKeyByValue(ApartmentType, apartmentType);
  const userTypeKey = getEnumKeyByValue(UserType, parsedAuthor.type);

  return {
    title: title,
    description,
    date: new Date(createdDate),
    city: CityType[city as keyof typeof CityType],
    previewImage,
    photos: JSON.parse(photos),
    premium: JSON.parse(premium),
    favorite: JSON.parse(favorite),
    rating: parseFloat(rating),
    apartmentType: ApartmentType[apartmentTypeKey!],
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    amenities: (JSON.parse(amenities) as string[]).map((a) => a as Amenity),
    author: {
      ...parsedAuthor,
      type: UserType[userTypeKey!],
    } as User,
    commentsCount: Number(commentsCount),
    coordinates: JSON.parse(coordinates) as Coordinates,
  };
}
