import { Module } from '@nestjs/common';
import { LeadsDataController } from './leads-data.controller';
import { LeadsDataService } from './leads-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead_Data } from 'src/entity-store/entities/leads_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead_Data])],
  controllers: [LeadsDataController],
  providers: [LeadsDataService],
})
export class LeadsDataModule {}
