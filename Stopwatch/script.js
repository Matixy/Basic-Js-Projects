// modal
const modalBox = document.querySelector('.modals')
const showModalButton = document.querySelector('button[data-name="showModal"]')
const hideModalButton = document.querySelector('button[data-name="hideModal"]')
// colors bar
const colorBarButton = document.querySelector('button[data-name="colorsBar"]')
const colorsBar = document.querySelector('.colors-bar')
const colorsButtons = document.querySelectorAll('.color-box')
colors = {
  active: 'orange',
  available: [...colorsButtons].map(el => el.dataset.colorName)
}
// stopwatch face
const playBtn = document.querySelector('button[data-name="play"]')
const pauseBtn = document.querySelector('button[data-name="pause"]')
const stopBtn = document.querySelector('button[data-name="stop"]')
const delBtn = document.querySelector('button[data-name="del"]')
const stopwatchTime = document.querySelector('.actual-time')
const previousTime = document.querySelector('.previous-time')

stopwatch = {
  seconds: 0,
  minutes: 0,
  timeIntervalId: 0,
  timeIsStopped: true,
  previousTimes: [],
  formatTime() {
    let formatedTime = ''

    stopwatch.minutes < 10 ? formatedTime += `0${stopwatch.minutes}:` : formatedTime += `${stopwatch.minutes}:`
    stopwatch.seconds < 10 ? formatedTime += `0${stopwatch.seconds}` : formatedTime += `${stopwatch.seconds}`

    return formatedTime
  },
  showTime() {stopwatchTime.textContent = stopwatch.formatTime()},
  countTime() {
    if (stopwatch.timeIsStopped) {
      stopwatch.timeIsStopped = false
      stopwatch.timeIntervalId = setInterval(() => {
        stopwatch.seconds += 1
  
        if (stopwatch.seconds === 60) {
          stopwatch.minutes += 1
          stopwatch.seconds = 0
        } 
  
        stopwatch.showTime()
      }, 1000)
    }
  },
  stopTime() {
    clearInterval(stopwatch.timeIntervalId)
    stopwatch.timeIsStopped = true
  },
  resetTime() {
    stopwatch.stopTime()
    if (stopwatch.seconds !== 0 || stopwatch.minutes !== 0) {
      stopwatch.previousTimes.push(stopwatch.formatTime())
      previousTime.textContent = `Last time: ${stopwatch.previousTimes.slice(-1)}`
      stopwatch.seconds = stopwatch.minutes = 0
      prepareArchiveItem(stopwatch.previousTimes.slice(-1))
      stopwatch.showTime()
    }
  },
  deleteTimes() {
    stopwatch.stopTime()
    stopwatch.seconds = stopwatch.minutes = 0
    previousTime.textContent = ''
    stopwatch.previousTimes = []
    deleteArchiveItems()
    stopwatch.showTime()
  }
}

// archive
const archiveBtn = document.querySelector('button[data-name="archive"]')
const archiveList = document.querySelector('ul[data-name="archiveList"]')

// archive func
const prepareArchiveItem = (time) => {
  const liItem = document.createElement('li')
  liItem.classList.add('times')
  liItem.innerHTML = `Time #${stopwatch.previousTimes.length}: <span class="bold">${time}</span>`

  archiveList.append(liItem)
}

const deleteArchiveItems = () => {
  while (archiveList.firstChild) {
    archiveList.removeChild(archiveList.lastChild)
  }
}

const toggleAchiveList = () => {
  archiveList.classList.toggle('hide')
}

// modals func
const showModal = () => {
  modalBox.classList.add('active')
}

const hideModal = () => {
  modalBox.classList.remove('active')
}

// color bar func
const toggleColorsBar = () => {
  colorsBar.classList.toggle('colors-bar-active')
}

const changeColor = (el) => {
  const colorElements = document.querySelectorAll(`.${colors.active}`)
  const colorBorderElements = document.querySelectorAll(`.border-${colors.active}`)
  const colorHoverElements = document.querySelectorAll(`.${colors.active}-hover`)

  for (const colorEl of colorElements) {
    colorEl.classList.remove(`${colors.active}`)
    colorEl.classList.add(`${el.dataset.colorName}`)
  }

  for (const colorBorderEl of colorBorderElements) {
    colorBorderEl.classList.remove(`border-${colors.active}`)
    colorBorderEl.classList.add(`border-${el.dataset.colorName}`)
  }

  for (const colorHoverEl of colorHoverElements) {
    colorHoverEl.classList.remove(`${colors.active}-hover`)
    colorHoverEl.classList.add(`${el.dataset.colorName}-hover`)
  }

  colors.active = el.dataset.colorName
}

const prepareDomEvents = () => {
  // modal events
  showModalButton.addEventListener('click', showModal)
  hideModalButton.addEventListener('click', hideModal)
  // colors bar events
  colorBarButton.addEventListener('click', toggleColorsBar)
  colorsButtons.forEach(el => el.addEventListener('click', e => changeColor(e.target)))
  // stopwatch events
  playBtn.addEventListener('click', stopwatch.countTime)
  pauseBtn.addEventListener('click', stopwatch.stopTime)
  stopBtn.addEventListener('click', stopwatch.resetTime)
  delBtn.addEventListener('click', stopwatch.deleteTimes)
  // achive event
  archiveBtn.addEventListener('click', toggleAchiveList)
}

const main = () => {
  prepareDomEvents()  
}

document.addEventListener('DOMContentLoaded', main)