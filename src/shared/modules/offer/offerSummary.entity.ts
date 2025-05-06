import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { ApartmentType, CityType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferSummaryEntity extends defaultClasses.Base {}

  @modelOptions({
    schemaOptions: {
      collection: 'offers',
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferSummaryEntity extends defaultClasses.TimeStamps {
    @prop({ trim: true, required: true })
  public title!: string;

    @prop({type:Number})
    public cost!: number;

    @prop({
      type: () => String,
      enum: ApartmentType,
    })
    public apartmentType!: ApartmentType;

    @prop({type:Boolean})
    public isFavorite!: boolean;

    @prop({type:Date})
    public date!: Date;

    @prop({
      type: () => String,
      enum: CityType,
    })
    public city!: CityType;

    @prop({type:String})
    public previewImage!: string;

    @prop({type:Boolean})
    public isPremium!: boolean;

    @prop({type:Number})
    public rating!: number;

    @prop({type:Number})
    public commentCount!: number;

    @prop({
      ref: UserEntity,
      required: true,
    })
    public userId!: Ref<UserEntity>;
}

export const OfferSummaryModel = getModelForClass(OfferSummaryEntity);
