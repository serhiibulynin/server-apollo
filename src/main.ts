import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ServerErrorCode } from './common/exception/graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors: {
          [key: string]: {
            [key: string]: string;
          };
        } = {};

        errors.forEach((error) => {
          formattedErrors[error.property] = {
            ...(formattedErrors[error.property] || {}),
            ...error.constraints,
          };
        });

        return new GraphQLError('Validation Error Exception', {
          extensions: {
            code: ServerErrorCode.VALIDATION_ERROR,
            fields: formattedErrors,
          },
        });
      },
    }),
  );
  // For development only, please use nginx for production
  app.use('/files', express.static(join(__dirname, '../files')));
  await app.listen(3000);
}
bootstrap();
