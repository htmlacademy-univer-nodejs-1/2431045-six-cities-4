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
  @prop({ trim: true, required: true, type: String })
  public title: string;

  @prop({trim: true, type: String})
  public description: string;

  @prop({type: Date})
  public date: Date;

  @prop({type: Number})
  public cost: number;

  @prop({
    type: () => String,
    enum: CityType,
  })
  public city: CityType;

  @prop({type: String})
    previewImage:string;

  @prop({type: [String]})
    photos:string[];

  @prop({type: Boolean})
  public isPremium: boolean;

  @prop({type: Boolean})
  public isFavorite: boolean;

  @prop({type: Number})
  public rating: number;

  @prop({
    type: () => String,
    enum: ApartmentType,
  })
  public apartmentType!: ApartmentType;

  @prop({type: Number})
  public rooms: number;

  @prop({type: Number})
  public guests: number;

  @prop({type: [String]})
  public amenities: Amenity[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({type:Number})
  public commentsCount: number;

}

export const OfferModel = getModelForClass(OfferEntity);
