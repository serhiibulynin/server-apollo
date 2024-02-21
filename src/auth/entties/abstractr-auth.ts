import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export abstract class AbstractAuth {
  @Field(() => String)
  accessToken: string;
}
