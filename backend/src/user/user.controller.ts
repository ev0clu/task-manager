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
import { Prisma } from '@prisma/client';
import { OmitUser } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'USER' | 'ADMIN'): Promise<OmitUser[]> {
    return this.userService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string): Promise<OmitUser> {
    return this.userService.findOne(id);
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe) createUserDto: Prisma.UserCreateInput,
  ): Promise<OmitUser> {
    return this.userService.create(createUserDto);
  }

  @Put(':id') // PUT /users/:id
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: Prisma.UserUpdateInput,
  ): Promise<OmitUser> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string): Promise<OmitUser> {
    return this.userService.delete(id);
  }
}
