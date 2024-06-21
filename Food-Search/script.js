const foodsList = document.querySelectorAll('.food')
const serachInput = document.querySelector('.search-input')
const errorInfo = document.querySelector('.error-info')

const main = () => {
  prepareDOMEvents()
}

const searchFood = () => {
  searchingValue = serachInput.value.toLowerCase()
  displayRightFood(searchingValue)
}

const displayRightFood = (searchingValue) => {
  foodsList.forEach(food => {
    if (food.textContent.toLowerCase().includes(searchingValue)) {
      food.classList.remove('hide')
    } else {
      food.classList.add('hide')
    }
  })

  toggleErrorInfo()
}

const toggleErrorInfo = () => {
  visiblesFoods = [...foodsList].filter(food => food.classList.contains('hide'))

  if (visiblesFoods.length === foodsList.length) {
      errorInfo.textContent = "Sorry, we don't have food with this name"
  } else {
    errorInfo.textContent = ''
  }
}

const prepareDOMEvents = () => {
  serachInput.addEventListener('keyup', searchFood)
}

document.addEventListener('DOMContentLoaded', main)