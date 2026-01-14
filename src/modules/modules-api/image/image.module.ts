import { Module } from '@nestjs/common';
import { ImageService } from './Image.service';
import { ImageController } from './Image.controller';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService],
  exports: [ImageService],
})
export class ImageModule {}
