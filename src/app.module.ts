import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonController } from './common/common.controller';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), }),
      MongooseModule.forRoot(process.env.MONGODB, {
        dbName: 'pokemondb'
      }),
      PokemonModule,
      SeedModule,
      CommonModule
  ],
  controllers: [CommonController],
})
export class AppModule {}
