// dto/create-image.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ example: 'beautiful-sunset', description: 'Tên ảnh' })
  @IsString()
  @IsNotEmpty()
  image_name: string;

  @ApiProperty({
    example: '/uploads/images/abc.jpg',
    description: 'Path lưu ảnh',
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: 'Ảnh hoàng hôn tại biển', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, description: 'ID user tạo ảnh' })
  @IsInt()
  user_id: number;
}
