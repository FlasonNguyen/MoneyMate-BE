import { DataTypes, Model } from 'sequelize';
import { sequelize, User } from '@/models';
import { AccountType } from '@/common/constants';
import { IAccount } from '@/interfaces';

export class Account extends Model implements IAccount {
  public declare id: string;
  public user_id: string;
  public name: string;
  public type: AccountType;
  public balance: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: [[...Object.values(AccountType)]],
      },
      defaultValue: AccountType.PERSONAL,
    },
    balance: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
      },
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'accounts',
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  },
);
