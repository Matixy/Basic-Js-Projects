const depositAmount = document.querySelector('input[data-id="amountDeposit"')
const withdrawAmount = document.querySelector('p[data-id="amountWithdraw"]')
const depositCurrencySelect = document.querySelector('select[data-id="currencyDeposit"]')
const withdrawCurrencySelect = document.querySelector('select[data-id="currencyWithdraw"]')
const swapBtn = document.querySelector('button[data-id="swap"]')
const exchangeRate = document.querySelector('p[data-id="exchangeRate"]')

prevCurrencies = {}

// api url's
API_LINK = 'https://api.frankfurter.app/latest'

const getCurrencyExchangeRate = async () => {
  fromCurrency = depositCurrencySelect.value
  toCurrency = withdrawCurrencySelect.value

  URL = `${API_LINK}?from=${fromCurrency}&to=${toCurrency}`

  try {
    let res = await axios.get(URL)
    let rate = res.data.rates[toCurrency]
  
    showExchangeRate(fromCurrency, toCurrency, rate)
    calculateExchangeRate(rate)
  } catch {
    console.log('error')
  }
}

const showExchangeRate = (fromCurrency, toCurrency, rate) => {
  exchangeRate.textContent = `1 ${fromCurrency} = ${rate} ${toCurrency}`
}

const calculateExchangeRate = (rate) => {
  const amount = (depositAmount.value * rate).toFixed(2)
  withdrawAmount.textContent = amount
}

const swapCurrencies = () => {
  const previousDepositCurrency = depositCurrencySelect.value

  depositCurrencySelect.value = withdrawCurrencySelect.value
  withdrawCurrencySelect.value = previousDepositCurrency

  getCurrencyExchangeRate()
}

const checkDepositValue = () => {
  if (depositAmount.value < 1) depositAmount.value = 1
  getCurrencyExchangeRate()
}

const updatePrevCurrencies = () => {
  prevCurrencies = {toCurrency: depositCurrencySelect.value, fromCurrency: withdrawCurrencySelect.value}
}

const checkSelectedCurrency = () => {
  if (depositCurrencySelect.value === withdrawCurrencySelect.value) {
    depositCurrencySelect.value = prevCurrencies.fromCurrency
    withdrawCurrencySelect.value = prevCurrencies.toCurrency
  }
  getCurrencyExchangeRate()
}

const prepareDomEvents = () => {
  depositAmount.addEventListener('focusout', checkDepositValue)
  depositCurrencySelect.addEventListener('mousedown', updatePrevCurrencies)
  withdrawCurrencySelect.addEventListener('mousedown', updatePrevCurrencies)
  depositCurrencySelect.addEventListener('change', checkSelectedCurrency)
  withdrawCurrencySelect.addEventListener('change', checkSelectedCurrency)
  swapBtn.addEventListener('mousedown', swapCurrencies)
}

const main = () => {
  prepareDomEvents()
  getCurrencyExchangeRate()
}

document.addEventListener('DOMContentLoaded', main)