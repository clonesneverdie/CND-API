import { Controller, Get } from '@nestjs/common';
import { LotusService } from './lotus.service';

@Controller('lotus')
export class LotusController {
  constructor(private lotusService: LotusService) {
    this.lotusService.getLotusInfo();
  }

  @Get('/owners')
  getLotusOwners() {
    return this.lotusService.getLotusOwners();
  }

  @Get('/list')
  getLotusList() {
    return this.lotusService.getLotusList();
  }
}
