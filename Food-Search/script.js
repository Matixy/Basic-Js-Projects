const foodsList = document.querySelectorAll('.food')
const serachInput = document.querySelector('.search-input')

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
}

const prepareDOMEvents = () => {
  serachInput.addEventListener('keyup', searchFood)
}

document.addEventListener('DOMContentLoaded', main)