import {CityType, ApartmentType, Amenity } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public image: string;
  public date: Date;
  public cost: number;
  public city: CityType;
  public gallery: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public apartmentType: ApartmentType;
  public roomCount: number;
  public guestCount: number;
  public amenities: Amenity[];
  public userId: string;
}
