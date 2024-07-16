import { Test, TestingModule } from '@nestjs/testing';
import { GreatService } from './great.service';

describe('GreatService', () => {
  let service: GreatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreatService],
    }).compile();

    service = module.get<GreatService>(GreatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
