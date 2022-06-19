export interface TransactionItem {
  currency: string,
  id: number,
  transactionStatus: string,
  purpose: string,
  fiController: string,
  fiInputter: string,
  fiSender: string,
  senderBank: string,
  senderAccountNumber: string,
  receiverBank: string,
  receiverAccountNumber: string,
  amount: number,
  senderName: string,
  receiverName: string,
  operationType: string,
  transactionRefNo: string,
  createdAt: string,
  updatedAt: null
}