import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validateEnv } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ContentModule } from './modules/content/content.module';
import { FeedModule } from './modules/feed/feed.module';
import { StudyModule } from './modules/study/study.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),
    DatabaseModule,
    HealthModule,
    // Modular monolith boundaries
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    ContentModule,
    FeedModule,
    StudyModule,
    QuizzesModule,
    AdminModule,
  ],
})
export class AppModule {}
