import {TransactionItem} from './transaction-item.model';
import {Pagination} from './pagination.model';

export interface TransactionApi {
    code: string;
    data: TransactionItem[];
    message: string;
    pagination: Pagination;
    
  }