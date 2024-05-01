import { Test, TestingModule } from '@nestjs/testing';
import { LeadsDataService } from './leads-data.service';

describe('LeadsDataService', () => {
  let service: LeadsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadsDataService],
    }).compile();

    service = module.get<LeadsDataService>(LeadsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
