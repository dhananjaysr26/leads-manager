import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead_Data } from 'src/entity-store/entities/leads_data.entity';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dto/leadsData.dto';

@Injectable()
export class LeadsDataService {
  constructor(
    @InjectRepository(Lead_Data)
    private LeadsDataRepo: Repository<Lead_Data>,
  ) {}

  async createLead(userId: number, payload: CreateLeadDto) {
    return this.LeadsDataRepo.save({ generated_by: userId, ...payload });
  }
  // TODO:pagination with filter
  async getAllLeads(userId: number) {
    return await this.LeadsDataRepo.createQueryBuilder('lead')
      .select([
        'lead.lead_id as "leadId"',
        'lead.applicant_name as name',
        'lead.applicant_number as "phoneNumber"',
        // 'lead.district as "district"',
        // 'lead.state as "state"',
        'lead.applicant_address as "address"',
        'lead.status as "status"',
        'lead.created_at as "created_at"',
      ])
      .where('generated_by = :userId', { userId })
      .getRawMany();
  }

  async getLeadDetails(leadId: number) {
    const leadDetails = await this.LeadsDataRepo.createQueryBuilder('lead')
      .select([
        'lead.lead_id as "leadId"',
        'lead.applicant_name as name',
        'lead.applicant_number as "phoneNumber"',
        'lead.district as "district"',
        'lead.state as "state"',
        'lead.applicant_address as "address"',
        'lead.status as "status"',
        'lead.created_at as "created_at"',
      ])
      .where('lead_id = :leadId', { leadId })
      .getRawOne();
    if (leadDetails) {
      return leadDetails;
    } else {
      throw new NotFoundException('Lead Not Found!');
    }
  }
}
