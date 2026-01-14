import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        age: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { user_id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.prisma.users.update({
      where: { user_id: id },
      data: {
        ...updateUserDto,
        updated_at: new Date(),
      },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        age: true,
        avatar: true,
        updated_at: true,
      },
    });
    return true;
  }
}
