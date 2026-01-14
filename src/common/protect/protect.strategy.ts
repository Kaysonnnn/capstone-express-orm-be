import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { users } from 'generated/prisma';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET || '',
    });
  }

  async validate({ userId }: { userId: users['user_id'] }) {
    const user = await this.prisma.users.findUnique({
      where: {
        user_id: userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return false;
    }

    console.log(`validate`, user);

    return user;
  }
}
