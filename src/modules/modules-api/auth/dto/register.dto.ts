import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Kiet' })
  fullName: string;

  @IsInt()
  @Min(18)
  @ApiProperty({ example: 18 })
  age: number;
}
