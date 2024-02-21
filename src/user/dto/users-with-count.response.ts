import { ObjectType, Int, Field } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class UsersWithCountResponse {
  @Field(() => [User])
  readonly rows: User[];

  @Field(() => Int)
  readonly count: number;
}
