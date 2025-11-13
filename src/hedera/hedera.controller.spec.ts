import { Test, TestingModule } from '@nestjs/testing';
import { HederaController } from './hedera.controller';

describe('HederaController', () => {
  let controller: HederaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HederaController],
    }).compile();

    controller = module.get<HederaController>(HederaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
