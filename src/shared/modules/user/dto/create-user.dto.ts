
import { UserType } from '../../../types/user/user-type.enum.js';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto{

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name:string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email:string;

  @IsString({ message: CreateUserMessages.avatar.invalidFormat })
  public avatar:string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password:string;

  @IsNotEmpty({ message: CreateUserMessages.type.missingType })
  @IsEnum(UserType, {
    message: CreateUserMessages.type.invalidType,
  })
  public userType: UserType;
}
