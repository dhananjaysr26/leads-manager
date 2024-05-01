import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { LeadsDataService } from './leads-data.service';
import { leadsDataRoutes } from './constant/leadsData.constant';
import { CreateLeadDto, UpdateLeadDto } from './dto/leadsData.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('leads-data')
export class LeadsDataController {
  constructor(private readonly leadsDataService: LeadsDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post(leadsDataRoutes.CreateLead)
  async createLead(@Body() createLeadDto: CreateLeadDto, @Request() req) {
    return this.leadsDataService.createLead(req.user.userId, createLeadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(leadsDataRoutes.getLeads)
  async getAllLeads(@Request() req) {
    return this.leadsDataService.getAllLeads(req.user.userId);
  }
  // TODO:leadAccessAuth
  @Get(leadsDataRoutes.Details)
  async getLeadDetails(@Param('id', ParseIntPipe) id: number) {
    return this.leadsDataService.getLeadDetails(id);
  }

  @Put(leadsDataRoutes.UpdateLead)
  async updateLead(
    @Param('leadId', ParseIntPipe) leadId: number,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    return { leadId, updateLeadDto };
  }

  @Delete(leadsDataRoutes.DeleteLead)
  async DeleteLead(@Param('leadId', ParseIntPipe) leadId: number) {
    return { leadId };
  }
}
