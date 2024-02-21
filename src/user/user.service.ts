import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import {
  ManagerNotFoundException,
  UserEmailAlreadyExistException,
  UserNotFoundException,
} from 'src/common/exception';
import { UpdateUserInput } from './dto/update-user.input';

const BCRYPT_SALT_ROUNDS = 12;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll<User>();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    const existUser = await this.findOneByEmail(input.email);

    if (existUser) {
      throw new UserEmailAlreadyExistException();
    }

    const { id } = await this.userModel.create({
      ...input,
      passwordHash: await this.getPasswordHash(input.password),
    });

    return await this.findOne(id);
  }

  async update(input: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findOne({ where: { id: input.id } });
    if (!user) {
      throw new ManagerNotFoundException();
    }

    user.setAttributes(input);
    await user.save();

    return await this.findOne(input.id);
  }

  async remove(currentUser: User, id: number): Promise<User> {
    if (currentUser.id === id) {
      throw new BadRequestException();
    }

    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new UserNotFoundException();
    }

    await user.destroy();

    return user;
  }

  async setAuthData(user: User, input: CreateUserInput) {
    return await user
      .setAttributes({
        email: input.email,
        passwordHash: await this.getPasswordHash(input.password),
      })
      .save();
  }

  private async getPasswordHash(password) {
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }
}
