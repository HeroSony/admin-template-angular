export interface TransactionItem{
  currency: string,
  transactionStatus: string,
  purpose: string,
  receiverBank: string,
  senderAccountNumber: string,
  amount: number,
  senderBank: string,
  receiverAccountNumber: string,
  fiController: string,
  fiInputter: string,
  fiSender: string,
  createdAt: string,
  updatedAt: null,
  senderName: string,
  receiverName: string,
  operationType: string,
  transactionRefNo: string,
  fastTransactionReqMessageId: string,
  fastTransactionRefNo: string,
  fastPaymentInfId: string,
  fastStatus: string,
  id: number
}
