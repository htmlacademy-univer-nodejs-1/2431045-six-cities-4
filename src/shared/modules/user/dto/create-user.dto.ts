import { UserType } from '../../../types/user/user-type.enum.js';

export class CreateUserDto{
  public name:string;
  public email:string;
  public avatar:string
  public password:string;
  public userType: UserType;
}
