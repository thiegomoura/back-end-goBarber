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
    let income = 0;
    let outcome = 0;
    let total = 0;
    this.transactions.findIndex(transaction => {
      if (transaction.type === 'income') {
        income = this.transactions.reduce(function (a, valorAtual) {
          return (a += valorAtual.value);
        }, 0);
      } else {
        outcome = this.transactions.reduce(function (b, valorAtual) {
          return (b += valorAtual.value);
        }, 0);
      }
    });
    total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
