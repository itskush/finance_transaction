export interface Account {
  id: string;
  name: string;
  bank: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface Transaction {
  id: string;
  accountId?: string;
  categoryId?: string;
  reference: string;
  date?: string;
  amount?: string;
  currency?: string;
}

export type CsvData = Account[] | Category[] | Transaction[];