import { Test, TestingModule } from '@nestjs/testing';
import { LeadsDataController } from './leads-data.controller';

describe('LeadsDataController', () => {
  let controller: LeadsDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsDataController],
    }).compile();

    controller = module.get<LeadsDataController>(LeadsDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
