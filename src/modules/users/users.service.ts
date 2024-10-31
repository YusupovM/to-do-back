import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@src/modules/users/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  public async getUserByProps(props, include: string[] = []): Promise<User> {
    return this.userModel.findOne({ where: props, attributes: { include } });
  }
}
