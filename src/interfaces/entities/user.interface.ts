import { Gender, AccountType, UserRole } from '@/common/constants';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  role: UserRole;
  gender: Gender;
  phone: string;
  avatar: string;
  accountType: AccountType;
}
