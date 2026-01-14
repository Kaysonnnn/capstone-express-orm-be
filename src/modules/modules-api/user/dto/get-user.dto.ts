import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  //   @Length(6, 50, { message: 'Mật khẩu phải từ 6-50 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  full_name: string;

  @IsOptional()
  //   @Min(10, { message: 'Tuổi tối thiểu là 10' })
  //   @Max(100, { message: 'Tuổi tối đa là 100' })
  age?: number;

  @IsOptional()
  avatar?: string;
}
