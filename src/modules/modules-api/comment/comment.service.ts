import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const { user_id, image_id, content } = createCommentDto;
    const newComment = await this.prisma.comments.create({
      data: {
        user_id,
        image_id,
        content,
        comment_date: new Date(),
      },
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            avatar: true,
          },
        },
      },
    });

    return {
      message: 'Đã bình luận thành công',
      stusCode: 200,
    };
  }

  // Get all comments by image
  async findByImageId(imageId: any, page: any = 1, pageSize: any = 10) {
    // Ép kiểu và validate input
    const imgId = Number(imageId);
    if (isNaN(imgId) || imgId <= 0) {
      throw new Error('Invalid imageId');
    }

    let currentPage = Number(page);
    let currentPageSize = Number(pageSize);

    currentPage = currentPage > 0 ? currentPage : 1;
    currentPageSize = currentPageSize > 0 ? currentPageSize : 10;

    const skip = (currentPage - 1) * currentPageSize;

    const [comments, totalItem] = await Promise.all([
      this.prisma.comments.findMany({
        where: { image_id: imgId },
        select: {
          comment_id: true,
          user_id: true,
          image_id: true,
          content: true,
          comment_date: true,
          users: {
            select: {
              user_id: true,
              full_name: true,
              avatar: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: currentPageSize,
      }),
      this.prisma.comments.count({
        where: { image_id: imgId },
      }),
    ]);

    const totalPage = Math.ceil(totalItem / currentPageSize);

    return {
      page: currentPage,
      pageSize: currentPageSize,
      totalItem,
      totalPage,
      items: comments,
    };
  }
}
