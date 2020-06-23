/* eslint-disable no-return-assign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(function (income, value) {
        if(value.type === 'income')
          return income + value.value;
        return income;
        }, 0)
    const outcome = this.transactions.reduce(function (outcome, value) {
        if(value.type === 'outcome')  
          return outcome + value.value;
        return outcome;
        }, 0);
    return {
      income,
      outcome,
      total: income-outcome };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
