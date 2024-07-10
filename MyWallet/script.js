// dashboard buttons
const addTransactionBtn = document.querySelector('button[data-id="addTransaction"]')
const clearAllBtn = document.querySelector('button[data-id="clearAll"]')
// Add transaction modal elements
const addTransactionModal = document.querySelector('aside.add-transaction-box')
const addTransactionElemList = addTransactionModal.querySelectorAll('select, input')
const saveTransactionBtn = document.querySelector('button[data-id="saveTransaction"]')
const cancelBtn = document.querySelector('button[data-id="cancelTransaction"]')
// tarsaction list and balance
const incomeList = document.querySelector('ul[data-list="income"]')
const expensesList = document.querySelector('ul[data-list="expenses"]')
const balance = document.querySelector('p.balance')
// styles btns
const colorsList = document.querySelectorAll('div[data-color-name]')
activeColor = 'white'

const toogleTransactionModal = () => {
  addTransactionModal.classList.toggle('hide')
  for (const el of addTransactionElemList) {
    el.value = ''
    hideFeedback(el)
  }
}

const changeColorStyle = (el) => {
  el = el.target

  const colorElList = document.querySelectorAll(`.color-${el.dataset.colorName}`)
  const bgElList = document.querySelectorAll(`.bg-${activeColor}`)
  const borderElList = document.querySelectorAll(`.border-${el.dataset.colorName}`)
  const outlineElList = document.querySelectorAll(`.outline-${el.dataset.colorName}`)

  for (const elem of colorElList) {
    elem.classList.remove(`color-${el.dataset.colorName}`)
    elem.classList.add(`color-${activeColor}`)
  }

  for (const elem of bgElList) {
    elem.classList.remove(`bg-${activeColor}`)
    elem.classList.add(`bg-${el.dataset.colorName}`)
  }

  for (const elem of borderElList) {
    elem.classList.remove(`border-${el.dataset.colorName}`)
    elem.classList.add(`border-${activeColor}`)
  }

  for (const elem of outlineElList) {
    elem.classList.remove(`outline-${el.dataset.colorName}`)
    elem.classList.add(`outline-${activeColor}`)
  }

  activeColor = el.dataset.colorName
}

const hasDisplayedFeedback = (el) => el.classList.contains('input-error')

const displayFeedback = (el) => {
  el.classList.add('input-error')
  el.nextElementSibling.classList.remove('hide')
} 

const hideFeedback = (el) => {
  el.classList.remove('input-error')
  el.nextElementSibling.classList.add('hide')
}

const checkElem = (el) => {
  if (el.target) el = el.target

  if (el.value.trim() == '') {
    displayFeedback(el)
    return false

  } else if (el.value.trim() != '' && hasDisplayedFeedback(el)) {
    hideFeedback(el)

    return true
  }
  return true
}

const saveNewTransaction = () => {
  let allDataIsRight = true

  for (const el of addTransactionElemList) {
    if (!checkElem(el)) allDataIsRight = false
  }

  if (allDataIsRight) {
    addNewTransaction()
  }
}

const addNewTransaction = () => {
  const transactionName = [...addTransactionElemList].filter(el => el.matches('[data-id="transactionName"]'))[0].value
  const amount = [...addTransactionElemList].filter(el => el.matches('[data-id="amount"]'))[0].value
  const categoryIcon = [...addTransactionElemList].filter(el => el.matches('[data-id="category"]'))[0].value

  if (amount > 0) {
    const newElem = prepareTransactionListElem(transactionName, amount, categoryIcon)
    incomeList.appendChild(newElem)
  } else if (amount < 0) {
    const newElem = prepareTransactionListElem(transactionName, amount, categoryIcon)
    expensesList.appendChild(newElem)
  }

  balance.textContent = `${parseFloat(balance.textContent.slice(0,-2)) + parseFloat(amount)} $`

  toogleTransactionModal()
}

const prepareTransactionListElem = (transactionName, amount, categoryIcon) => {
  const li = document.createElement('li')
  li.classList.add('transaction')
  li.dataset.transactionId = [...incomeList.children, ...expensesList.children].length + 1

  const divIconName = document.createElement('div')
  const icon = document.createElement('i')
  icon.classList.add('fa-solid', `fa-${categoryIcon}`)

  const transactionParagraph = document.createElement('p')
  transactionParagraph.textContent = transactionName

  const divAmountClose = document.createElement('div')
  const amountParagraph = document.createElement('p')
  amountParagraph.classList.add('bold')
  amount > 0 ? amountParagraph.classList.add('color-green') : amountParagraph.classList.add('color-red')
  amountParagraph.textContent = `${amount} $`

  const exitIcon = document.createElement('i')
  exitIcon.classList.add('fa-solid', 'fa-xmark', 'resize-hover')

  divIconName.append(icon, transactionParagraph)
  divAmountClose.append(amountParagraph, exitIcon)

  li.append(divIconName, divAmountClose)
  return li
}

const checkClick = (el) => {
	if (el.target.matches('.fa-xmark')) {
		deleteTransaction(el)
	}
}

const deleteTransaction = (el) => {
	(el.target.closest('li')).remove()
}

const removeAllTransactions = () => {
  const transactions = document.querySelectorAll('[data-transaction-id]')

  transactions.forEach(el => el.remove())
    balance.textContent = `0 $`
}

const prepareDomEvents = () => {
  // hide & show transaction modal
  addTransactionBtn.addEventListener('click', toogleTransactionModal)
  cancelBtn.addEventListener('click', toogleTransactionModal)
  // change colors 
  colorsList.forEach(el => el.addEventListener('click', changeColorStyle))
  // transaction elements
  saveTransactionBtn.addEventListener('click', saveNewTransaction)
  addTransactionElemList.forEach(el => el.addEventListener('focusout', checkElem))
  incomeList.addEventListener('click', checkClick)
  expensesList.addEventListener('click', checkClick)
  clearAllBtn.addEventListener('click', removeAllTransactions)
}

const main = () => {
  prepareDomEvents()
}

document.addEventListener('DOMContentLoaded', main)