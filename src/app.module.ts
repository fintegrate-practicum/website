import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { businessModule } from './worker/businessapirequest/moudle/business.moudle';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [    
    ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    businessModule,

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // uri: process.env.MONGODB_CONNECTION,
        //ליצור קובץ env
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
