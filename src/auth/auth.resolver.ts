import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { Auth } from './entties/auth-entity';
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  public async signIn(@Args('input') input: SignInInput): Promise<Auth> {
    return await this.authService.signInByEmail(input.email, input.password);
  }
}
