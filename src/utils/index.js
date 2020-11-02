export function returnSelectedDropdown({ nativeEvent }) {
  const { selectedIndex } = nativeEvent.target.options
  const key = nativeEvent.target.name;
  const selected = nativeEvent.target[selectedIndex].value;
  return { key, selected };
}


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

export function calculateTransactions(transactions) {
  return transactions.map(transaction => transaction.value).reduce((a, b) => a + b, 0)
}