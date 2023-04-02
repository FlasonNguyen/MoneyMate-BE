import { AccountType } from '@/common/constants';

export interface IAccount {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  balance: number;
}
