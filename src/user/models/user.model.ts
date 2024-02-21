import { Field, ObjectType } from '@nestjs/graphql';
import {
  DataType,
  Column,
  PrimaryKey,
  Model,
  Table,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Table
@ObjectType({ description: 'user' })
export class User extends Model implements AuthUser {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field()
  id: number;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  @Field({ nullable: true })
  email: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  @Field({ nullable: true })
  firstName: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  @Field({ nullable: true })
  lastName: string;

  @AllowNull(true)
  @Column(DataType.CHAR(60))
  passwordHash?: string;
}
