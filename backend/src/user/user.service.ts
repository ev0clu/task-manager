import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  findAll(role?: 'USER' | 'ADMIN') {
    return 'findAll';
  }

  findOne(id: number) {
    return 'findOne';
  }

  create(createUserDto: CreateUserDto) {
    return 'create';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return 'update';
  }

  delete(id: number) {
    return 'delete';
  }
}
