import { Controller, Get, Param, UseInterceptors, Query, Body, Post, Delete, Put, } from '@nestjs/common';
import { businessService } from '../services/business.service';
import { Organization } from '../schema/organization.entity';
// import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';

@Controller('business')
export class businessController {
  constructor(private readonly businessService: businessService) { }

  @Get()
  async findAll(@Query('businessId') data: any): Promise<Organization[]> {
    return this.businessService.findAll();
  }

  @Get(':name')
  getBusinessByName(@Param('name') name: string) {
    console.log(name + " name");
    return this.businessService.getBusinessByName(name);
  }

  @Delete(':name')
  deleteBusinessByName(@Param('name') name: string) {
    return this.businessService.deleteBusinessByName(name);
  }
  //יצירת עסק חדש
  @Post(':data')
  async createBusiness2(@Body() data: Organization) {
    console.log("log log");
    console.log(data + "data");
    return this.businessService.createBusiness2(data);
  }
  //עדכון נתונים לפי שם
  @Put('name')
  async updateBusiness(@Param('name') name: string, @Body() newData: Organization): Promise<Organization> {
    const updatedBusiness = this.businessService.updateBusinessByName(name, newData);
    return updatedBusiness;
  }
}
