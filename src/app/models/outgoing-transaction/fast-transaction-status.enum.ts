export enum FastTransactionStatus {
    All = 'All',
    AcknowledgedAndSettled = 'AcknowledgedAndSettled',
    AcknowledgedByFI = 'AcknowledgedByFI',
    FailedAtCM = 'FailedAtCM',
    FailedAtFI = 'FailedAtFI',
    Pending = 'Pending',
    ReceivedAtACH = 'ReceivedAtACH',
    ReceivedAtFI = 'ReceivedAtFI',
    RefundedAndSettled = 'RefundedAndSettled',
    RefundedByReceiver = 'RefundedByReceiver',
    RejectedAtCore = 'RejectedAtCore',
    RejectedByController = 'RejectedByController',
    RejectedBySender = 'RejectedBySender',
    Settled = 'Settled',
    SignedAndClosed = 'SignedAndClosed',
    Unsettled = 'Unsettled',
}