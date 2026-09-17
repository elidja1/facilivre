import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { TestDatabaseDto } from './dto/test-db.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Get('database/status')
  @ApiOperation({ summary: 'Obtenir l\'état de la base de données Supabase / PostgreSQL' })
  @ApiResponse({ status: 200, description: 'Statut de connexion à la base' })
  async getDatabaseStatus() {
    return this.adminService.getDatabaseStatus();
  }

  @Public()
  @Post('database/test')
  @ApiOperation({ summary: 'Tester une URL de connexion Supabase en temps réel' })
  @ApiResponse({ status: 200, description: 'Résultat du test de connexion' })
  async testConnection(@Body() dto: TestDatabaseDto) {
    return this.adminService.testConnection(dto);
  }

  @Public()
  @Post('database/save')
  @ApiOperation({ summary: 'Enregistrer et valider une nouvelle configuration Supabase' })
  async saveConfig(@Body() dto: TestDatabaseDto) {
    return this.adminService.saveDatabaseConfig(dto);
  }
}
