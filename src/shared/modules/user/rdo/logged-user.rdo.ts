import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;
}
