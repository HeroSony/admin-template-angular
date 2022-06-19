export interface CurrencyType {
    id: number;
    name: string;
    value: string;
    selected?: boolean;
}
export interface FormatType {
    id: number;
    name: string;
    value: string;
}

export interface TransactionType {
    id: string;
    name: string;
    value: string;
}


export interface ChannelType {
    id: string;
    name: string;
    value: string;
}

export interface Status {
    id: string;
    name: string;
    value: string;
}

export interface TransactionReportModel {
    senderName: string,
    receiverName: string,
    senderBank: string,
    receiverBank: string,
    amount: number,
    currency: string,
    id: number,
    openDate: string,
    transactionStatus: string,
    createdAt: string,
}
