import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { OmitUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'USER' | 'ADMIN'): Promise<OmitUser[]> | never {
    return this.userService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string): Promise<OmitUser> | never {
    return this.userService.findOne(id);
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<OmitUser> | never {
    return this.userService.create(createUserDto);
  }

  @Put(':id') // PUT /users/:id
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<OmitUser> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
