import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length, ValidateIf } from 'class-validator';

@InputType()
export class SignInInput {
  @Field({ nullable: true })
  @ValidateIf((input) => input.email)
  @IsEmail()
  email: string;

  @Field()
  @Length(4, 100)
  password: string;
}
