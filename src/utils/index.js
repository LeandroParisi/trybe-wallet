export function returnSelectedDropdown({ nativeEvent }) {
  const { selectedIndex } = nativeEvent.target.options
  const key = nativeEvent.target.name;
  const selected = nativeEvent.target[selectedIndex].value;
  return { key, selected };
}

// Filters

export function filterByType(transactions, type) {
  return transactions.filter(transaction => transaction.transactionType === type)
}

export function filterByCategoryAndPaymentMethod (transactions, category, method) {
  const filteredByCategory = filterByCategory(transactions, category);
  const filteredByCategoryAndMethod = filterByPaymentMethod(filteredByCategory, method)
  return filteredByCategoryAndMethod;
}

export function filterByCategory(transactions, category) {
  if(category === "All") {
    return transactions;
  } else { 
    return transactions.filter(transaction => transaction.category === category)
  }
}

export function filterByPaymentMethod(transactions, method) {  
  if(method === 'All') {
    return transactions
  } else {
    return transactions.filter(transaction => transaction.method === method)
  }
}


// Transactions

export function calculateIncomesAndExpenses(transactions) {
  const incomes = transactions
    .filter(transaction => transaction.transactionType === 'Income')
    .map(transaction  => transaction.convertedValue.value)
    .reduce((a, b) => a + b, 0);

  const expenses = transactions
    .filter(transaction => transaction.transactionType === 'Expense')
    .map(transaction  => transaction.convertedValue.value)
    .reduce((a, b) => a + b, 0)

  return { incomes, expenses }
}

export function calculateTransactions(transactions) {
  return transactions.map(transaction => transaction.convertedValue.value).reduce((a, b) => a + b, 0)
}

export function generateTransaction({ transactionType, value, description, currency, method, category, originAccount, destinationAccount }) {
  
  const date = createDateDetails();
  const valueNumber = Number(value);

  const transaction = {
    transactionType,
    value: valueNumber,
    convertedValue: { value: valueNumber, currency },
    description,
    currency,
    method,
    category,
    originAccount,
    destinationAccount,
    date
  };

  if(destinationAccount === '') {
    delete transaction.destinationAccount;
  }

  return transaction;
}

// -- Accounts
export function calculateAccounsTotalBalance(accounts) {
  const values = Object.values(accounts);
  return values.reduce((a, b) => a + b)

}

// -- Dates

function createDateDetails() {
  const date = new Date();
  
  return {
    fullData: date,
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  }
}

export const monthsNumberKey = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12,
}

export const monthsNumberValue = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const currentMonth = monthsNumberValue[new Date().getMonth()];

export const filterByMonth = (transactions, month) => {
  const monthId = monthsNumberKey[month];
  return transactions.filter(transaction => transaction.date.month === monthId)
}


// -- Convert Values:

export function convertValues(transactions, currency) {
  const newTransactions = [];

  transactions.forEach(transaction => {
    const currentCurrency = transaction.convertedValue.currency;
    
    if(currentCurrency === currency) {
      return newTransactions.push(transaction)
    } 
    
    else {
      const currentCurrencyToUsd = parseFloat(transaction.exchangeRates.rates[currentCurrency])

      const newCurrencyToUsd = parseFloat(transaction.exchangeRates.rates[currency])

      const convertedValue = (transaction.convertedValue.value / currentCurrencyToUsd) * newCurrencyToUsd;

      const updatedTransaction = { 
        ...transaction,
        convertedValue: {
          value: convertedValue,
          currency
        }
      }
      newTransactions.push(updatedTransaction)
    }
  })

  return newTransactions;
}