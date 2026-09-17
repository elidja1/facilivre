import { Controller, Post, Body, HttpCode, HttpStatus, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur / SuperAdmin' })
  @ApiResponse({ status: 200, description: 'Connexion réussie avec token JWT' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir les informations du compte connecté' })
  async getProfile(@Headers('authorization') authHeader?: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Token requis');
    }
    const token = authHeader.replace('Bearer ', '');
    const validation = await this.authService.validateToken(token);
    if (!validation.isValid) {
      throw new UnauthorizedException('Session expirée ou invalide');
    }
    return {
      user: {
        id: validation.id,
        username: validation.username,
        role: validation.role,
      },
    };
  }
}
