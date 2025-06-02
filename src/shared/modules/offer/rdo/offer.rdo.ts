import { Expose } from 'class-transformer';
import { Amenity, ApartmentType, CityType } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public cost: number;

  @Expose()
  public city: CityType;

  @Expose()
    previewImage:string;

  @Expose()
  photos:string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public apartmentType!: ApartmentType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  public userId: string;

  @Expose()
  public commentsCount: number;
}