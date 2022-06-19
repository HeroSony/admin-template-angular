export interface TransactionDetail {

  id: number,
  transactionRefNo: string,
  originalTransactionRefNo: string,
  operationType: string,
  senderBank: string,
  receiverBank: string,
  senderAccountNumber: string,
  receiverAccountNumber: string,
  senderName: string,
  receiverName: string,
  amount: number,
  currency: string,
  fee: number,
  feeFt: null,
  creditCurrency: string,
  debitCurrency: string,
  transactionStatus: string,
  paygateReferenceId: string,
  preFundTransferReference: null,
  createdAt: string,
  updatedAt: null,
  transactionApproval: string,
  isRefund: boolean,
  isReversal: boolean,
  reason: string,
  errorMessage: string,
  fiController: string,
  fiInputter: string,
  fiSender: string,
  purpose: string,
  commissionAgent: 0,
  commissionAgentFt: string,
  commissionBankMember: 0,
  commissionBankMemberFt: string,
  commissionNBC: 0,
  commissionNBCFt: string,
  reversalPaygateReferenceId: string,
  reversalMainStatus: string
  reversalMainFt: string,
  reversalFeeFt: string,
  reversalFeeFtStatus: string,
  reversalCommissionAgentFt: string,
  reversalCommissionAgentFtStatus: string,
  reversalCommissionBankMemberFt: string,
  reversalCommissionBankMemberFtStatus: string,
  reversalCommissionNBCFt: string,
  reversalCommissionNBCFtStatus: string,
  terminalId: string,
  channel: string,
  transactionMainType: string,
  transactionType: string,
  sourceType: string,
  branchCode: string,
  fastTransactionReqMessageId: string,
  fastTransactionRefNo: string,
  fastPaymentInfId: string,
  fastRefundOriginalPaymentInfId: string,
  fastStatus: string,
  fastResponseMessage: null,
  t24TransactionRefNo: string,
  t24MessageId: string,
  t24Status: string,
  t24ResponseMessage: null,
  checker: {
    email: string,
    firstname: string,
    groupPosition: string,
    id: number,
    lastname: string,
    username: string,
  },
  maker: {
    email: string,
    firstname: string,
    groupPosition: string,
    id: number,
    lastname: string,
    username: string,
  }
}