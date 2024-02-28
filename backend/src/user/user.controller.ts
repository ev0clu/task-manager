import { Body, Controller, Param, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { OmitUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id') // PUT /user/:id
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<OmitUser> {
    return this.userService.update(id, updateUserDto);
  }
}
