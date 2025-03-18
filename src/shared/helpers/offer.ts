import { Offer, User } from '../types/index.js';

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
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorUserType,
    commentsCount,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  const amenitiesArray = amenities.split(',').filter((a): a is Offer['amenities'][number] => ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'].includes(a));

  const author: User = {
    name: authorName,
    email: authorEmail,
    avatar: authorAvatar,
    password: authorPassword,
    userType: authorUserType as Offer['author']['userType'],
  };

  return {
    title: title || 'No found',
    description,
    date: new Date(createdDate),
    city: city as Offer['city'],
    previewImage,
    photos: photos ? photos.split(',') : [],
    premium: premium === 'true', 
    favorite: favorite === 'true', 
    rating: parseFloat(rating),
    housingType: housingType as Offer['housingType'],
    rooms: parseInt(rooms, 10) || 0,
    guests: parseInt(guests, 10) || 0,
    price: parseInt(price, 10) || 0,
    amenities: amenitiesArray,
    author,
    commentsCount: parseInt(commentsCount, 10) || 0,
    latitude: parseFloat(latitude) || 0,
    longitude: parseFloat(longitude) || 0
  };
}
