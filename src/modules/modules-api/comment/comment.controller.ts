import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Tạo bình luận mới' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'Bình luận được tạo thành công',
    schema: {
      example: {
        message: 'Đã bình luận thành công',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // Get all comments by image
  @Get('image/:id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Danh sách bình luận của ảnh',
    schema: {
      example: {
        page: 1,
        pageSize: 10,
        totalItem: 35,
        totalPage: 4,
        items: [
          {
            comment_id: 1,
            user_id: 2,
            image_id: 5,
            content: 'Ảnh rất đẹp!',
            comment_date: '2025-09-22T15:32:10.123Z',
            users: {
              user_id: 2,
              full_name: 'Nguyễn Văn A',
              avatar: 'https://example.com/avatar.jpg',
            },
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid imageId hoặc tham số không hợp lệ',
  })
  async getCommentsByImage(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.commentService.findByImageId(id, page, pageSize);
  }
}
