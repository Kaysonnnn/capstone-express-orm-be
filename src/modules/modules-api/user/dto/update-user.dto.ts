import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Minh Huy' })
  full_name?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 18 })
  @Min(1, { message: 'Tuổi phải lớn hơn 0' })
  @Max(120, { message: 'Tuổi không hợp lệ' })
  age?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'image/upload/v1758467166/images/zcsr8uyhfvq9spluwjcm',
  })
  avatar?: string;
}
