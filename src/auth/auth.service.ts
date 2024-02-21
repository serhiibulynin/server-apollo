import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entties/auth-entity';
import { User } from 'src/user/models/user.model';
import { AuthUser } from './interfaces/auth-user.interface';
import { UserService } from 'src/user/user.service';
import {
  InvalidEmailOrPasswordFoundException,
  UserNotFoundException,
} from 'src/common/exception';
import { AbstractAuth } from './entties/abstractr-auth';

export enum UserTypes {
  USER,
  MANAGER,
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signInByEmail(email: string, password: string): Promise<Auth> {
    return this.signInByUser(
      await this.userService.findOneByEmail(email),
      password,
    );
  }

  async verify(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  async signIn(user: AuthUser): Promise<AbstractAuth> {
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
      }),
    };
  }

  async signInByUser(user: User, password: string): Promise<Auth> {
    return {
      ...(await this.signInByAbstractUser(user, password)),
      user,
    };
  }

  private async signInByAbstractUser(
    user: AuthUser,
    password: string,
  ): Promise<AbstractAuth> {
    if (!user) {
      throw new UserNotFoundException();
    }

    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new InvalidEmailOrPasswordFoundException();
    }

    return this.signIn(user);
  }
}
