import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { QueryImageDto } from './dto/query-image.dto';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryImageDto) {
    let { page, pageSize, keyword } = query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;

    const index = (page - 1) * pageSize;

    let where: any = {};

    if (keyword && typeof keyword === 'string') {
      where.OR = [
        { description: { contains: keyword } },
        { image_name: { contains: keyword } },
      ];
    }

    const articlesPromise = this.prisma.images.findMany({
      skip: index,
      take: pageSize,
      where,
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    const totalItemPromise = this.prisma.images.count({ where });

    const [articles, totalItem] = await Promise.all([
      articlesPromise,
      totalItemPromise,
    ]);

    return {
      page,
      pageSize,
      totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
      items: articles || [],
    };
  }

  async findOne(id: number) {
    const image = await this.prisma.images.findUnique({
      where: { image_id: id },
      select: {
        image_id: true,
        image_name: true,
        path: true,
        description: true,
        user_id: true,
        users: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return image;
  }

  async checkSaved(userId: number, imageId: number) {
    const saved = await this.prisma.saved_images.findUnique({
      where: {
        user_id_image_id: {
          user_id: userId,
          image_id: imageId,
        },
      },
    });
    return { isSaved: !!saved };
  }

  async saveImage(userId: number, imageId: number) {
    // kiểm tra đã lưu chưa
    const existed = await this.prisma.saved_images.findUnique({
      where: {
        user_id_image_id: {
          user_id: userId,
          image_id: imageId,
        },
      },
    });

    if (existed) {
      // Nếu tồn tại thì xóa => hủy lưu
      await this.prisma.saved_images.delete({
        where: {
          user_id_image_id: {
            user_id: userId,
            image_id: imageId,
          },
        },
      });

      return { message: 'Image unsaved successfully!', isSaved: false };
    }

    // Nếu chưa tồn tại thì lưu mới
    const saved = await this.prisma.saved_images.create({
      data: {
        user_id: userId,
        image_id: imageId,
        saved_date: new Date(),
      },
    });

    return { message: 'Image saved successfully!', isSaved: true };
  }

  async getSavedImages(userId: number) {
    const savedImages = await this.prisma.saved_images.findMany({
      where: { user_id: userId },
      include: {
        images: {
          select: {
            image_id: true,
            image_name: true,
            path: true,
            description: true,
            user_id: true,
            users: {
              select: {
                user_id: true,
                full_name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return savedImages.map((s) => s.images);
  }

  async getCreatedImages(userId: number) {
    const createdImages = await this.prisma.images.findMany({
      where: { user_id: userId },
      select: {
        image_id: true,
        image_name: true,
        path: true,
        description: true,
        user_id: true,
        users: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return createdImages;
  }

  async createImage(data: CreateImageDto) {
    await this.prisma.images.create({
      data: {
        image_name: data.image_name,
        path: data.path,
        description: data.description,
        user_id: data.user_id,
      },
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return {
      message: 'Image created successfully!',
      statusCode: 200,
    };
  }
  async deleteImage(imageId: number, userId: number) {
    const image = await this.prisma.images.findUnique({
      where: { image_id: imageId },
    });

    if (!image) {
      throw new HttpException('Image not found!', HttpStatus.NOT_FOUND);
    }

    // xóa tất cả saved_images liên quan (tránh lỗi FK constraint)
    await this.prisma.saved_images.deleteMany({
      where: { image_id: imageId },
    });

    // xóa tất cả comments liên quan (nếu có)
    await this.prisma.comments.deleteMany({
      where: { image_id: imageId },
    });

    // hard delete image
    await this.prisma.images.delete({
      where: { image_id: imageId },
    });

    return true;
  }
}
