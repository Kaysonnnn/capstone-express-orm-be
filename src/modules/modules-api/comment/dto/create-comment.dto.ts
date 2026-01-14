import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'ID của user' })
  user_id: number;

  @ApiProperty({ example: 5, description: 'ID của hình ảnh cần comment' })
  image_id: number;

  @ApiProperty({ example: 'Ảnh đẹp quá!', description: 'Nội dung bình luận' })
  content: string;
}
