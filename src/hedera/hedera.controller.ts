import { Controller, Post, Body } from '@nestjs/common';
import { HederaService } from './hedera.service';

@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) {}

  @Post('invest')
  async invest(@Body() body: { receiverAccount: string; amount: number }) {
    const { receiverAccount, amount } = body;
    return this.hederaService.sendTokens(receiverAccount, amount);
  }
}
