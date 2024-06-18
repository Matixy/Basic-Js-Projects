const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=96a06073aa9cf9838a4e291b64f74728'
const API_UNITS = '&units=metric'

const main = () => {
    prepareDOMEvents()
    getWeather()
}

const prepareDOMEvents = () => {

    button.addEventListener('click', getWeather)
    input.addEventListener('keyup', enterKeyCheck)
}

const getWeather = () => {
    const city = input.value || 'London'
    const URL = API_LINK + city + API_KEY + API_UNITS  
    
    axios.get(URL)
        .then(res => {
            const temp = res.data.main.temp
            const hum = res.data.main.humidity
            const status = Object.assign({}, ...res.data.weather)

            cityName.textContent = res.data.name
            temperature.textContent = Math.floor(temp) + '°C'
            humidity.textContent = hum + '%'
            weather.textContent = status.main

            setWeatherIcon(status.id)
            clearInput()
        })
        .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta')
}

const setWeatherIcon = id => {
    let imageName
    if (id >= 200 && id < 300) {
        imageName = 'thunderstorm.png'
    } else if (id >= 300 && id < 400) {
        imageName = 'drizzle.png'
    } else if (id >= 500 && id < 600) {
        imageName = 'rain.png'
    } else if ((id >= 600 && id < 700)) {
        imageName = 'ice.png'
    } else if ((id >= 700 && id < 800)) {
        imageName = 'fog.png'
    } else if (id === 800) {
        imageName = 'sun.png'
    } else if (id >= 800 && id < 810) {
        imageName = 'cloud.png'
    } else {
        imageName = 'unknown.png'
    }

    photo.setAttribute('src', `./img/${imageName}`)
}

const clearInput = () => {
    warning.textContent = ''
    input.value = ''
}

const enterKeyCheck = (e) => {
    if (e.key === 'Enter') {
        getWeather()
    }
}

document.addEventListener('DOMContentLoaded', main)