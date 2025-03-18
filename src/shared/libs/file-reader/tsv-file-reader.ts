import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly fileName: string) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createDate, city, previewImage, photos, premium, favorite, rating, housingType, rooms, guests, price, amenities, authorName, authorEmail, authorAvatar, authorPassword, authorUserType, commentsCount, latitude, longitude]): Offer => ({
        title: title || 'Not found',
        description: description || '',
        date: new Date(createDate),
        city: city as Offer['city'],
        previewImage: previewImage || '',
        photos: photos ? photos.split(',') : [],
        premium: premium === 'true',
        favorite: favorite === 'true',
        rating: parseFloat(rating) || 0,
        housingType: housingType as Offer['housingType'],
        rooms: parseInt(rooms, 10) || 0,
        guests: parseInt(guests, 10) || 0,
        price: parseInt(price, 10) || 0,
        amenities: amenities ? amenities.split(',').filter((a): a is Offer['amenities'][number] => ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'].includes(a)) : [],
        author: {
          name: authorName,
          email: authorEmail,
          avatar: authorAvatar,
          password: authorPassword,
          userType: authorUserType as Offer['author']['userType'],
        },
        commentsCount: parseInt(commentsCount, 10) || 0,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0
      }));
  }
}
