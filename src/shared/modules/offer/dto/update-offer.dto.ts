import { Amenity } from '../../../types/index.js';
import { ApartmentType, CityType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public previewImage?: string;
  public date?: Date;
  public price?: number;
  public city?: CityType;
  public photos?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public apartmentType?: ApartmentType;
  public roomCount?: number;
  public guestCount?: number;
  public amenities?: Amenity[];
  public latitude?: number;
  public longitude?: number;
}
