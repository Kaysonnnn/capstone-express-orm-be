import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/modules/modules-system/token/token.module';
// đường dẫn đúng tới file ProtectStrategy
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { ProtectStrategy } from 'src/common/protect/protect.strategy';

@Module({
  imports: [
    TokenModule,
    PassportModule.register({ defaultStrategy: 'protect' }), // Đăng ký passport với strategy mặc định
  ],
  controllers: [AuthController],
  providers: [AuthService, ProtectStrategy, PrismaService],
  exports: [PassportModule],
})
export class AuthModule {}
