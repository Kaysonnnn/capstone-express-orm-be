import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { responseSuccess } from 'src/common/helpers/response.helper';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết user theo ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID của user',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Thông tin user',
    schema: {
      example: {
        user_id: 1,
        email: 'user@example.com',
        full_name: 'Nguyễn Văn A',
        age: 25,
        avatar: 'https://example.com/avatar.jpg',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cập nhật thông tin user' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID của user cần update',
    example: 1,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin user thành công',
    schema: {
      example: {
        success: true,
        message: 'Update info user successfully',
        data: true,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(+id, updateUserDto);
    const response = responseSuccess(result, `Update info user successfully`);
    return response;
  }
}
