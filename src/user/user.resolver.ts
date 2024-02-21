import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'currentUser' })
  me(@Context('user') user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  update(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.update(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'removeUser' })
  remove(
    @Context('user') user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.userService.remove(user, id);
  }

  @Mutation(() => User)
  async setAuthData(
    @Context('user') user: User,
    @Args('token') token: string,
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    return await this.userService.setAuthData(user, input);
  }
}
