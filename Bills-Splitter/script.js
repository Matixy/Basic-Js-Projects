const billForm = document.querySelector('.calculate-bill')
const billFormData = [...billForm.elements].filter(elem => elem.tagName !== 'BUTTON')

const billAmount = document.getElementById('billAmount')
const tipAmount = document.getElementById('tipAmount')
const personsAmount = document.getElementById('personsAmount')

const resultInfo = document.querySelector('.result-info')

const submitForm = (e) => {
  e.preventDefault()

  let allDataIsRight = true
  
  for (const elem of billFormData) {
    if (!checkData(elem)) allDataIsRight = false 
  }

  if (allDataIsRight) {
    const splitBill = calculateSplitBill()
    resultInfo.innerHTML = `Each person should give <span class="bold">${splitBill}</span> $`
  }
}

const checkData = (elem) => {
  let dataIsRight = false 

  if (elem.value == '') {
    showFeedback(elem)
  } else {
    if (elem.tagName === 'INPUT') {
      checkInput(elem)
    }

    hideFeedback(elem)
    dataIsRight = true
  }

  return dataIsRight
}

const checkInput = (elem) => {
  if (parseInt(elem.value) <= 0) {
    elem.value = 1
  }
}

const showFeedback = (elem) => {
  elem.nextElementSibling.textContent = 'Please fill the data'
}

const hideFeedback = (elem) => {
  elem.nextElementSibling.textContent = ''
}

const calculateSplitBill = () => {
  const billVal = parseInt(billAmount.value)
  const tipVal = parseFloat(tipAmount.value)
  const personVal = parseInt(personsAmount.value)
  
  return ((billVal + (billVal * tipVal)) / personVal).toFixed(2)
}

const main = () => {
  // prepare dom events
  billFormData.forEach(elem => elem.addEventListener('focusout', (e) => checkData(e.target)))
  billForm.addEventListener('submit', submitForm)
}

document.addEventListener('DOMContentLoaded', main)