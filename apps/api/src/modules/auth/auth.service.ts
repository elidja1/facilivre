import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 1. SuperAdmin Default Credential Check for Phase 1 / Configuration
    if (
      (username.toLowerCase() === 'superadmin' || username.toLowerCase() === 'superadmin@facilivre.bj') &&
      password === 'superadmin'
    ) {
      this.logger.log('SuperAdmin successfully authenticated via master credentials');
      return {
        accessToken: `facilivre_superadmin_token_${Date.now()}`,
        tokenType: 'Bearer',
        expiresIn: 3600 * 24,
        user: {
          id: 'superadmin-master-id',
          username: 'superadmin',
          email: 'superadmin@facilivre.bj',
          firstName: 'Super',
          lastName: 'Admin',
          role: 'SUPER_ADMIN',
          status: 'ACTIVE',
          permissions: ['*'],
        },
      };
    }

    // 2. If database is available, check DB users
    try {
      const dbUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: username },
          ],
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (dbUser && dbUser.passwordHash === password) {
        const roles = dbUser.roles.map((r) => r.role.name);
        return {
          accessToken: `facilivre_user_token_${dbUser.id}_${Date.now()}`,
          tokenType: 'Bearer',
          expiresIn: 3600 * 24,
          user: {
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            role: roles[0] || 'STUDENT',
            status: dbUser.status,
          },
        };
      }
    } catch (e: any) {
      this.logger.warn(`Database user lookup fallback: ${e.message}`);
    }

    throw new UnauthorizedException('Identifiants incorrects. Veuillez vérifier votre nom d\'utilisateur et mot de passe.');
  }

  async validateToken(token: string) {
    if (token.startsWith('facilivre_superadmin_token_')) {
      return {
        id: 'superadmin-master-id',
        username: 'superadmin',
        role: 'SUPER_ADMIN',
        isValid: true,
      };
    }
    return { isValid: false };
  }
}
