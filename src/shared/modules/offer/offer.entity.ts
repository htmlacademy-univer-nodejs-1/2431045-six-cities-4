import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { Amenity, ApartmentType, CityType } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public date!: Date;

  @prop()
  public cost!: number;

  @prop({
    type: () => String,
    enum: CityType,
  })
  public city!: CityType;

  @prop()
    previewImage!:string;

  @prop()
    photos:string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: ApartmentType,
  })
  public apartmentType!: ApartmentType;

  @prop()
  public rooms: number;

  @prop()
  public guests: number;

  @prop()
  public amenities: Amenity[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
