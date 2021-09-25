import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import LotusABI from '../../ContractABI/LotusStaking.json';
const provider = new ethers.providers.JsonRpcProvider(
  'https://polygon-rpc.com/',
);
const LotusCA = '0x4172DF61f6842870049FcD07b8E9FE6CEA7789EA';
const lotusContract = new ethers.Contract(LotusCA, LotusABI, provider);

@Injectable()
export class LotusService {
  private lotusCount;
  private lotusOwners;
  private lotusOwnerList = [];
  private lotusList = [];

  async getLotusOwners() {
    const lotusCountHex = await lotusContract.lotusCount();
    const lotusCount = parseInt(lotusCountHex._hex);
    if (this.lotusCount !== lotusCount) {
      await this.getLotusInfo();
      this.lotusOwners = this.lotusOwnerList.length;
      return { owners: this.lotusOwners };
    }
    this.lotusOwners = this.lotusOwnerList.length;
    return { owners: this.lotusOwners };
  }

  getLotusList() {
    return this.lotusList;
  }

  async getLotusInfo() {
    const lotusCountHex = await lotusContract.lotusCount();
    const lotusCount = parseInt(lotusCountHex._hex);
    this.lotusCount = lotusCount;

    const ownerList = [];
    const allLotuses = [];

    for (let i = 1; i < lotusCount; i++) {
      const arr = await lotusContract.lotuses(i);
      if (arr[0] === '0x0000000000000000000000000000000000000000') {
        continue;
      }
      const potentialNectarHex = await lotusContract.subsidyOf(i);
      const potentialNectarFloat = parseInt(potentialNectarHex._hex) / 1e18;
      const potentialNectar = Math.floor(potentialNectarFloat);

      if (!ownerList.includes(arr[0])) {
        ownerList.push(arr[0]);
      }
      allLotuses.push({
        lotusId: i,
        clonesNum: parseInt(arr[1]._hex),
        potentialNectar: potentialNectar,
        owner: arr[0],
      });
      console.log(ownerList.length);
    }
    this.lotusOwnerList = ownerList;
    this.lotusList = allLotuses;
    console.log('end');
  }
}
