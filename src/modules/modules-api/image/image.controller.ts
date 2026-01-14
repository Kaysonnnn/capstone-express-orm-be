// images.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import { QueryImageDto } from './dto/query-image.dto';
import { ImageService } from './Image.service';
import { CreateImageDto } from './dto/create-image.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Public } from 'src/common/decorators/public.decorator';
@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly ImageService: ImageService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Tạo ảnh mới' })
  @ApiBody({ type: CreateImageDto })
  @ApiResponse({ status: 200, description: 'Image created successfully' })
  async create(@Body() createImageDto: CreateImageDto) {
    return this.ImageService.createImage(createImageDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách ảnh (có phân trang và filter)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({
    name: 'keyword',
    required: false,
    type: String,
    description: 'Từ khóa tìm kiếm',
  })
  @ApiResponse({ status: 200, description: 'Danh sách ảnh trả về' })
  async findAll(@Query() query: QueryImageDto) {
    return this.ImageService.findAll(query);
  }

  @Get('saved')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy ảnh đã lưu của user' })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Danh sách ảnh đã lưu' })
  async getSavedImages(@Query('userId') userId: string) {
    return this.ImageService.getSavedImages(Number(userId));
  }

  @Get('created')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy ảnh do user tạo' })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Danh sách ảnh đã tạo' })
  async getCreatedImages(@Query('userId') userId: string) {
    return this.ImageService.getCreatedImages(Number(userId));
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy thông tin 1 ảnh theo id' })
  @ApiParam({ name: 'id', description: 'Image id', type: Number })
  @ApiResponse({ status: 200, description: 'Thông tin ảnh' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  findOne(@Param('id') id: string) {
    return this.ImageService.findOne(Number(id));
  }

  @Get('save/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Kiểm tra ảnh đã được user lưu chưa' })
  @ApiParam({ name: 'id', description: 'Image id', type: Number })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Trả về { isSaved: boolean }' })
  async checkSaved(
    @Param('id') imageId: string,
    @Query('userId') userId: string,
  ) {
    return this.ImageService.checkSaved(Number(userId), Number(imageId));
  }

  @Post('save/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lưu / hủy lưu ảnh (toggle) cho user' })
  @ApiParam({ name: 'id', description: 'Image id', type: Number })
  @ApiBody({
    schema: { properties: { userId: { type: 'number', example: 123 } } },
  })
  @ApiResponse({ status: 200, description: 'Kết quả lưu/hủy lưu' })
  async saveImage(
    @Param('id') imageId: string,
    @Body('userId') userId: number,
  ) {
    return this.ImageService.saveImage(userId, Number(imageId));
  }

  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Xóa ảnh (hard delete)' })
  @ApiParam({ name: 'id', description: 'Image id', type: Number })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async deleteImage(
    @Param('id') imageId: string,
    @Query('userId') userId: string,
  ) {
    const result = await this.ImageService.deleteImage(
      Number(imageId),
      Number(userId),
    );
    // Nếu bạn dùng responseSuccess wrapper, swagger cũng hiện schema dạng boolean hoặc object
    return { success: result, message: 'Image deleted successfully!' };
  }
}
