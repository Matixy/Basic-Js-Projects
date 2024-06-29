const registerForm = document.querySelector('.register-form')
const loginInput = registerForm.querySelector('#username')
const passwordInput = registerForm.querySelector('#password')
const repeatPasswordInput = registerForm.querySelector('#repeat-passowrd')
const clearBtn = registerForm.querySelector('.clear-btn')
const emailInput = registerForm.querySelector('#email')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const checkLoginInput = () => {
  if (loginInput.value.length < 3) {
    displayFeedback(loginInput)

    return false
  } else if (loginInput.value.length >= 3 && hasDisplayedFeedback(loginInput)) {
    hideFeedback(loginInput)

    return true
  }
  return true
}

const checkPassword = () => {
  if (passwordInput.value.length < 8) {
    displayFeedback(passwordInput)

    return false
  } else if (passwordInput.value.length >= 8 && hasDisplayedFeedback(passwordInput)) {
    hideFeedback(passwordInput)

    return true
  }
  return true
}

const checkRepeatPassword = () => {
  if (repeatPasswordInput.value !== passwordInput.value || repeatPasswordInput.value === '') {
    displayFeedback(repeatPasswordInput)

    return false
  } else if (repeatPasswordInput.value === passwordInput.value && hasDisplayedFeedback(repeatPasswordInput)) {
    hideFeedback(repeatPasswordInput)

    return true
  }
  return true
}

const checkEmail = () => {
  if (!emailRegex.test(emailInput.value)) {
    displayFeedback(emailInput)

    return false
  } else if (emailRegex.test(emailInput.value) && hasDisplayedFeedback(emailInput)) {
    hideFeedback(emailInput)

    return true
  }
  return true
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

const submitForm = (e) => {
  e.preventDefault()

  let allDataIsRight = true

  if (!checkLoginInput()) allDataIsRight = false
  if (!checkPassword()) allDataIsRight = false
  if (!checkRepeatPassword()) allDataIsRight = false
  if (!checkEmail()) allDataIsRight = false

  if (allDataIsRight) {
    location.reload()
  }
}

const clearForm = (e) => {
  loginInput.value = ''
  passwordInput.value = ''
  repeatPasswordInput.value = ''
  emailInput.value = ''

  for (const el of registerForm) {
    if (el.tagName === 'INPUT') {
      hideFeedback(el)
    }
  }
}

const prepareDomEvents = () => {
  loginInput.addEventListener('focusout', checkLoginInput)
  passwordInput.addEventListener('focusout', checkPassword)
  passwordInput.addEventListener('focusout', checkRepeatPassword)
  repeatPasswordInput.addEventListener('focusout', checkRepeatPassword)
  emailInput.addEventListener('focusout', checkEmail)

  registerForm.addEventListener('submit', submitForm)
  clearBtn.addEventListener('click', clearForm)
}

const main = () => {
  prepareDomEvents()
}

document.addEventListener('DOMContentLoaded', main)