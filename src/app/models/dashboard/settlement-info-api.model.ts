interface SettlementInfoInterface {
  bizDate: Date;
  bizTime: Date;
  myBankId: string;
  nextSess: Date;
  nextSettleUSD: number;
  nextSettleKHR: number;
  settleUSD: number;
  settleKHR: number;
}

export class SettlementInfoApiModel implements SettlementInfoInterface{
  bizDate: Date;
  bizTime: Date;
  myBankId: string;
  nextSess: Date;
  nextSettleKHR: number;
  nextSettleUSD: number;
  settleKHR: number;
  settleUSD: number;

  constructor(data: SettlementInfoInterface) {
    this.bizDate = data.bizDate
    this.bizTime = data.bizTime
    this.myBankId = data.myBankId
    this.nextSess = data.nextSess
    this.nextSettleKHR = data.nextSettleKHR
    this.nextSettleUSD = data.nextSettleUSD
    this.settleKHR = data.settleKHR
    this.settleUSD = data.settleUSD
  }

}
