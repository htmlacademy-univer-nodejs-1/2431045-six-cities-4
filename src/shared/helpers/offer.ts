import { Amenity, ApartmentType, CityType, Offer} from '../types/index.js';
import { UserType } from '../types/user/user-type.enum.js';

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
    housingType,
    rooms,
    guests,
    price,
    amenities,
    author,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');


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
    housingType: ApartmentType[housingType as keyof typeof ApartmentType],
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    amenities: (JSON.parse(amenities) as string[]).map((a) => a as Amenity),
    author:{
      ...JSON.parse(author),
      type: UserType[
        JSON.parse(author).type as string as keyof typeof UserType
      ]
    },
    commentsCount: Number(commentsCount),
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
}
