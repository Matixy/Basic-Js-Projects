const settingsBtn = document.querySelector('button.settings-btn')
const settingsBar = document.querySelector('.settings-bar')
const timer = document.querySelector('.timer')
const timerHeading = document.querySelector('.heading')
// settings properties
const eventNameInput = document.querySelector('input[data-id="eventName"]')
const dayInput = document.querySelector('input[data-id="day"]')
const monthInput = document.querySelector('input[data-id="month"]')
const yearInput = document.querySelector('input[data-id="year"]')
const imageUrlInput = document.querySelector('input[data-id="imageUrl"]')
const saveBtn = document.querySelector('button[data-id="saveBtn"]')
DEFAULT_IMG_URL = 'https://www.onecalendar.nl/images/onecalendar.jpg'
// timer cards
const timerCardsList = document.querySelectorAll('[data-card]')

const displayedEventName = document.querySelector('[data-id="displayedEventName"]')

// countdown timer object
const countdownTimer = {
  intervalId: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
} 

const toggleSettingsBar = () => {
  settingsBar.classList.toggle('settings-bar-active')
  timer.classList.toggle('timer-slide-off')
}

const updateCoundownTimerObject = () => {
  const newDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value)
  const currentDate = new Date()
  let timeDiff = Math.floor((newDate.getTime() - currentDate.getTime()) / 1000)

  countdownTimer.days = Math.floor(timeDiff / 86400)
  timeDiff -= countdownTimer.days * 86400

  countdownTimer.hours = Math.floor(timeDiff / 3600) % 24
  timeDiff -= countdownTimer.hours * 3600

  countdownTimer.minutes = Math.floor(timeDiff / 60) % 60
  timeDiff -= countdownTimer.minutes * 60

  countdownTimer.seconds = timeDiff
}

const changeCardTime = () => {
  for (const card of timerCardsList) {
    card.firstElementChild.textContent = countdownTimer[card.dataset.card]
  }
}

const startCountdown = () => {
  countdownTimer.intervalId = setInterval(() => {
    countdownTimer.seconds -= 1

    if (countdownTimer.seconds == 0 && countdownTimer.minutes == 0 && countdownTimer.hours == 0 && countdownTimer.days == 0) {
      changeCardTime()
      clearInterval(countdownTimer.intervalId)
    } else {
      if (countdownTimer.seconds === -1) {
        countdownTimer.seconds = 59
        if (countdownTimer.minutes !== 0) {
          countdownTimer.minutes -= 1
        } else {
          countdownTimer.minutes = 59
          if (countdownTimer.hours !== 0) {
            countdownTimer.hours -= 1
          } else {
            countdownTimer.days -= 1
            countdownTimer.hours = 23
          }
        }
      } 
      changeCardTime()
    }
  }, 1000)
}

const setEvent = () => {
  if (countdownTimer.intervalId) clearInterval(countdownTimer.intervalId)
  updateCoundownTimerObject()
  changeCardTime()
  startCountdown()
}

const changeEventName = () => {
  const newEventName = eventNameInput.value
  displayedEventName.textContent = `${newEventName} in:`
}

const changeImg = () => {
  timerHeading.style.backgroundImage = `url(${imageUrlInput.value})`
}

const saveSettings = () => {
  changeEventName()
  changeImg()
  setEvent()
}

// checking all date settings inputs
const checkEventName = () => {
  if (eventNameInput.value === '') eventNameInput.value = 'New year'
}

const checkLeapYear = (year) => ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) ? true : false

const checkDay = () => {
  const currentDate = new Date()
  MonthsWith31Days = ["1","3","5","7","8","10","12"]
  MonthsWith30Days = ["4","6","9","11"]
  
  if (
    (yearInput.value == currentDate.getFullYear() && dayInput.value <= currentDate.getDay()) 
  ) {
    dayInput.value = currentDate.getDay() + 1
  } else if (dayInput.value < 1) {
    dayInput.value = 1
  } else if (monthInput.value == 2 && dayInput.value > 29 && checkLeapYear(yearInput.value)) {
    dayInput.value = 29
  } else if (monthInput.value == 2 && dayInput.value > 28 && !checkLeapYear(yearInput.value)) {
    dayInput.value = 28
  } else if (MonthsWith31Days.includes(monthInput.value) && dayInput.value > 31) {
    dayInput.value = 31
  } else if (MonthsWith30Days.includes(monthInput.value) && dayInput.value > 30) {
    dayInput.value = 30
  }
}

const checkMonth = () => {
  const currentDate = new Date()
  
  if (
    (yearInput.value == currentDate.getFullYear() 
    && (monthInput.value < currentDate.getMonth() + 1 || monthInput.value < 1 || monthInput.value > 12))
  ) {
    monthInput.value = currentDate.getMonth() + 1
  } else if (monthInput.value < 1) {
    monthInput.value = 1
  } else if (monthInput.value > 12) {
    monthInput.value = 12
  }
  checkDay()
}

const setMinYear = () => {
  const currentYear = new Date().getFullYear()
  yearInput.min = currentYear
  yearInput.value = currentYear + 1
}

const checkYear = () => {
  const currentDate = new Date()

  if (yearInput.value < currentDate.getFullYear()) {
    yearInput.value = currentDate.getFullYear()
  }

  checkMonth()
}

const prepareDomEvents = () => {
  settingsBtn.addEventListener('click', toggleSettingsBar)
  saveBtn.addEventListener('click', saveSettings)
  eventNameInput.addEventListener('focusout', checkEventName)
  dayInput.addEventListener('focusout', checkDay)
  monthInput.addEventListener('focusout', checkMonth)
  yearInput.addEventListener('focusout', checkYear)
}

const main = () => {
  prepareDomEvents()
  setMinYear()
  changeImg()
  setEvent()
}

document.addEventListener('DOMContentLoaded', main)