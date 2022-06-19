export interface Transaction{
    amount: number,
    currency: string,
    purpose: string,
    receiverAccountName: string,
    receiverAccountNumber: string,
    receiverBankCode: string,
    senderAccountName: string,
    senderAccountNumber: string
}