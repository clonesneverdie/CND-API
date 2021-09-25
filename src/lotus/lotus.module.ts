import { Module } from '@nestjs/common';
import { LotusController } from './lotus.controller';
import { LotusService } from './lotus.service';

@Module({
  controllers: [LotusController],
  providers: [LotusService],
})
export class LotusModule {}
