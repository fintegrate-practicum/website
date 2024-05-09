// import { Controller, HttpCode } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { APISetting, APISettingSchema } from './api-setting.model';

// @Controller('api-settings')
// export class APISettingsController {
//   @Get()
//   getAPISettings() {
//     // ... Get API settings logic ...
//   }

//   @Post()
//   @HttpCode(201)
//   createAPISetting(@Body() settingData: APISetting) {
//     // ... Create API setting logic ...
//   }
// }


// @Module({
//   imports: [MongooseModule.forFeature([APISetting, APISettingSchema])],
//   controllers: [APISettingsController],
//   // ... (Other providers if needed) ...
// })
// export class APISettingsModule {}
