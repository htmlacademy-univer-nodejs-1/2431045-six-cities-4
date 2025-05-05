import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { UserType } from '../../types/user/user-type.enum.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
    @prop({ unique: true, required: true, type:String })
    public email!: string;

    @prop({ required: false, default: '', type: String })
    public avatar!: string;

    @prop({ required: true, default: '', type: String })
    public name!: string;

    @prop({ required: true, default: '', type: String })
    public password?: string;

    @prop({ required: false, default: UserType.Default,
      enum: UserType,
      type: String
     })
    public userType: UserType;

    constructor(userData: User) {
      super();

      this.email = userData.email;
      this.avatar = userData.avatar;
      this.name = userData.name;
      this.userType = userData.userType;
    }

    public setPassword(password: string, salt:string){
      this.password = createSHA256(password, salt);
    }


    public getPassword(){
      return this.password;
    }
}


export const UserModel = getModelForClass(UserEntity);
