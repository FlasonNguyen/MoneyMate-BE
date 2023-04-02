import { Gender, UserType, UserRole } from '@/common/constants';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
  gender: Gender;
  accountType: UserType;
}
