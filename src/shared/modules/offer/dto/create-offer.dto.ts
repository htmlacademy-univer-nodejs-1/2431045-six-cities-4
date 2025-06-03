import {CityType, ApartmentType, Amenity } from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { MaxDecimalPlaces } from '../../../helpers/index.js';
import { AMENITY_VALUES } from '../../../types/index.js';

export class CreateOfferDto {

  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  public description: string;

  @MaxLength(256, { message: CreateOfferValidationMessage.image.maxLength })
  public image: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.date.invalidFormat }
  )
  public date: Date;

  @IsNumber()
  @Min(100, { message: CreateOfferValidationMessage.cost.min })
  @Max(100000, { message: CreateOfferValidationMessage.cost.max })
  public cost: number;

  @IsEnum(CityType, { message: CreateOfferValidationMessage.city.invalidCity })
  public city: CityType;

  @IsArray()
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.gallery.minLength })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.gallery.maxLength })
  @IsString({ each: true })
  public gallery: string[];


  public isPremium: boolean;
  public isFavorite: boolean;

  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.rating.min })
  @Max(5, { message: CreateOfferValidationMessage.rating.max })
  @Validate(MaxDecimalPlaces)
  public rating: number;

  public apartmentType: ApartmentType;

  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.guestCount.min })
  @Max(10, { message: CreateOfferValidationMessage.guestCount.max })
  public roomCount: number;

  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.guestCount.min })
  @Max(10, { message: CreateOfferValidationMessage.guestCount.max })
  public guestCount: number;

  @IsArray()
  @ArrayNotEmpty({ message: CreateOfferValidationMessage.amenities.empty })
  @IsIn(AMENITY_VALUES, {
    each: true,
    message: CreateOfferValidationMessage.amenities.includeAmenities,
  })
  public amenities: Amenity[];

  public userId: string;
}
