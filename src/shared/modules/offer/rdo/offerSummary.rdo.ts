import { Expose } from 'class-transformer';
import { CityType } from '../../../types/index.js';

export class OfferSummaryRdo {

  @Expose()
  public title: string;

  @Expose()
  public date: Date;

  @Expose()
  public price: number;

  @Expose()
  public city: CityType;

  @Expose()
    previewImage:string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public commentCount: number;
}
