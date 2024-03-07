import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { OmitUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { TUser } from './types/user.type';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET /user
  @HttpCode(HttpStatus.OK)
  profile(@Req() req: Request): Promise<TUser> | never {
    const user = req.user;
    return this.userService.profile(user['sub']);
  }

  @Put() // PUT /user
  @HttpCode(HttpStatus.OK)
  update(
    @Req() req: Request,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<OmitUser> {
    const user = req.user;
    return this.userService.update(user['sub'], updateUserDto);
  }
}
