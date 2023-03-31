import { IsString, IsEmail, IsUUID, IsDate, IsEnum } from 'class-validator';
import { Gender, UserRole, AccountType } from '@/common/constants';
import { IUser } from '@/interfaces';

export class UserDto implements IUser {
  @IsUUID()
  public id?: string;
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsEnum(Gender)
  public gender: Gender;

  @IsString()
  public phone: string;

  @IsString()
  public avatar: string;

  @IsEnum(UserRole)
  public role: UserRole;

  @IsEnum(AccountType)
  public login_type: AccountType;

  @IsDate()
  public created_at: Date;

  @IsDate()
  public updated_at: Date;
}
