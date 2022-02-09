import Money from 'js-money';

export const abs = (money: Money) => new Money(Math.abs(money.getAmount()), money.currency);
