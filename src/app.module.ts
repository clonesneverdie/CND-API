import { Module } from '@nestjs/common';
import { LotusModule } from './lotus/lotus.module';

@Module({
  imports: [LotusModule],
})
export class AppModule {}
