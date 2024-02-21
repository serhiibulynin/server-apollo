import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { AbstractAuth } from './abstractr-auth';

@ObjectType()
export class Auth extends AbstractAuth {
  @Field((type) => User)
  user: User;
}
