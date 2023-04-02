import { DataTypes, Sequelize, Model } from 'sequelize';
import { sequelize } from '@/models';
import { UserType, Gender, UserRole } from '@/common/constants';
import { IUser } from '@/interfaces';

export class User extends Model implements IUser {
  public declare id: string;
  public firstName: string;
  public lastName: string;
  public avatar: string;
  public phone: string;
  public email: string;
  public password: string;
  public role: UserRole;
  public gender: Gender;
  public accountType: UserType;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      validate: { is: /^[0-9()-]+$/ },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be a valid email' },
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [[...Object.values(UserRole)]],
          msg: 'Invalid User Role',
        },
      },
      defaultValue: UserRole.USER,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [[...Object.values(Gender)]],
          msg: 'Invalid Gender',
        },
      },
      defaultValue: Gender.OTHER,
    },
    accountType: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [[...Object.values(UserType)]],
          msg: 'Invalid Account Type',
        },
      },
      defaultValue: UserType.EMAIL,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
      deletedRows: {
        paranoid: false,
      },
    },
    hooks: {},
    tableName: 'users',
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  },
);
