import { Test, TestingModule } from '@nestjs/testing';
import { GreatController } from './great.controller';
import { GreatService } from './great.service';

describe('GreatController', () => {
  let controller: GreatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreatController],
      providers: [GreatService],
    }).compile();

    controller = module.get<GreatController>(GreatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
