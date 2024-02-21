import { getGraphQLError } from './common/exception/graphql/index';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'data',
      autoLoadModels: true,
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      csrfPrevention: false,
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
      formatError: (
        formattedError: GraphQLFormattedError,
        error: unknown,
      ): GraphQLFormattedError => {
        return {
          ...getGraphQLError(formattedError, error),
          path: formattedError.path,
          locations: formattedError.locations,
        };
      },
      context: async (ctx) => {
        // subscriptions
        if (ctx.connectionParams) {
          return {
            req: {
              headers: { authorization: ctx.connectionParams.Authorization },
            },
          };
        }
        // queries and mutations
        return ctx;
      },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
