import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { OmitUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { TUser } from './types/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id') // GET /user/:id
  @HttpCode(HttpStatus.OK)
  profile(@Param('id') id: string): Promise<TUser> | never {
    return this.userService.profile(id);
  }

  @Put(':id') // PUT /user/:id
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<OmitUser> {
    return this.userService.update(id, updateUserDto);
  }
}
