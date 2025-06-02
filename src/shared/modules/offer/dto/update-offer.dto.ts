import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { Amenity } from '../../../types/index.js';
import { ApartmentType, CityType, AMENITY_VALUES } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { MaxDecimalPlaces } from '../../../helpers/index.js';

export class UpdateOfferDto {

  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, {
    message: UpdateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: UpdateOfferValidationMessage.description.maxLength,
  })
  public description?: string;

  @IsOptional()
  @MaxLength(256, { message: UpdateOfferValidationMessage.image.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: UpdateOfferValidationMessage.date.invalidFormat }
  )
  public date?: Date;

  @IsOptional()
  @IsNumber()
  @Min(100, { message: UpdateOfferValidationMessage.price.min })
  @Max(100000, { message: UpdateOfferValidationMessage.price.max })
  public price?: number;

  @IsOptional()
  @IsEnum(CityType, { message: UpdateOfferValidationMessage.city.invalidTown })
  public city?: CityType;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6, { message: UpdateOfferValidationMessage.gallery.minLength })
  @ArrayMaxSize(6, { message: UpdateOfferValidationMessage.gallery.maxLength })
  @IsString({ each: true })
  public photos?: string[];

  public isPremium?: boolean;
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: UpdateOfferValidationMessage.rating.min })
  @Max(5, { message: UpdateOfferValidationMessage.rating.max })
  @Validate(MaxDecimalPlaces)
  public rating?: number;

  @IsOptional()
  @IsEnum(ApartmentType, {
    message: UpdateOfferValidationMessage.apartmentType.invalidApartment,
  })
  public apartmentType?: ApartmentType;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: UpdateOfferValidationMessage.roomCount.min })
  @Max(8, { message: UpdateOfferValidationMessage.roomCount.max })
  public roomCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: UpdateOfferValidationMessage.guestCount.min })
  @Max(10, { message: UpdateOfferValidationMessage.guestCount.max })
  public guestCount?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: UpdateOfferValidationMessage.amenities.empty })
  @IsIn(AMENITY_VALUES, {
    each: true,
    message: UpdateOfferValidationMessage.amenities.includeAmenities,
  })
  public amenities?: Amenity[];

  @IsOptional()
  @IsNumber()
  public latitude?: number;

  @IsOptional()
  @IsNumber()
  public longitude?: number;
}
