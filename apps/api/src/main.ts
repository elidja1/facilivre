import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('FaciLivreBootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 4000;
  const host = configService.get<string>('host') || '0.0.0.0';
  const prefix = configService.get<string>('prefix') || 'api/v1';
  const nodeEnv = configService.get<string>('nodeEnv') || 'development';
  const isProduction = nodeEnv === 'production';

  // CORS: loaded from configuration.ts which merges env var + hardcoded list
  const corsOrigins = configService.get<string[]>('corsOrigins') || [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://student-omega-gilt.vercel.app',
    'https://facilivre-admin.vercel.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, Swagger, mobile)
      if (!origin) return callback(null, true);

      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      // In development, allow all. In production, reject unknown origins.
      if (!isProduction) {
        return callback(null, true);
      }

      logger.warn(`CORS blocked request from origin: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS policy`), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global prefix (health check accessible at root /health)
  app.setGlobalPrefix(prefix, {
    exclude: ['health'],
  });

  // Global Pipes & Interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger (only in development)
  if (!isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('FaciLivre API')
      .setDescription('The FaciLivre modular backend API')
      .setVersion('0.1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);
    logger.log(`?? Swagger Documentation: http://localhost:${port}/api/docs`);
  }

  await app.listen(port, host);
  logger.log(`?? FaciLivre API running [${nodeEnv}] on port ${port}`);
  logger.log(`?? Health: http://localhost:${port}/health`);
  logger.log(`?? CORS allowed origins: ${corsOrigins.join(', ')}`);
}

bootstrap();
