import { Expose, Type } from 'class-transformer';
import { Amenity, ApartmentType, CityType } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public price: number;

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

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates:number
}
