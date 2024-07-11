// header buttons
const addNoteBtn = document.querySelector('button[data-id="addNote"]')
const clearAllBtn = document.querySelector('button[data-id="clearAll"]')
// modal elements
const addNoteModal = document.querySelector('aside.addNote-modal')
const categoryElem = document.querySelector('select[data-id="category"]')
const noteContentElem = document.querySelector('textarea[data-id="noteContent"]')
const saveNoteBtn = document.querySelector('button[data-id="saveNote"]')
const cancelNoteBtn = document.querySelector('button[data-id="cancelNote"]')
// notes box
const notesBox = document.querySelector('section.content-box')

const toggleAddNoteMode = () => {
  addNoteModal.classList.toggle('hide')
  if (addNoteModal.classList.contains('hide')) {
    categoryElem.value = ''
    noteContentElem.value = ''
    hideFeedback(categoryElem)
    hideFeedback(noteContentElem)
  }
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

const checkElemIsEmpty = (el) => {
  if (el.target) el = el.target

  if (el.value.trim() === '') {
    displayFeedback(el)
    return true
  } else if (el.value.trim() !== '' && hasDisplayedFeedback(el)) {
    hideFeedback(el)
  }
  return false
}

const saveNote = () => {
  let allDataIsRight = true

  if (checkElemIsEmpty(categoryElem)) allDataIsRight = false
  if (checkElemIsEmpty(noteContentElem)) allDataIsRight = false

  if (allDataIsRight) {
    addNote()
    toggleAddNoteMode()
  }
}

const addNote = () => {
  const newNote = createNoteElem(categoryElem.value, noteContentElem.value, notesBox.children.length + 1)
  notesBox.append(newNote)
}

const createNoteElem = (categoryName, noteContent, noteId) => {
  const article = document.createElement('article')
  article.classList.add('note', `bg-note-${categoryName}`)
  article.dataset.noteId = noteId

  const header = document.createElement('header')
  header.classList.add('note-heading')

  const h4 = document.createElement('h4')
  h4.textContent = categoryName

  const button = document.createElement('button')
  button.type = 'button'
  button.title = 'Delete note'
  button.classList.add('color-dark', 'resize-hover')
  button.innerHTML = '<i class="fa-solid fa-xmark l"></i>'

  header.append(h4, button)

  const pre = document.createElement('pre')
  pre.classList.add('note-content')
  pre.textContent = noteContent

  article.append(header, pre)
  return article
}

const checkClickOnNote = (e) => {
  if (e.target.matches('button[title="Delete note"]')) {
    deleteNote(e)
  }
}

const deleteNote = (e) => {
  e.target.closest('article').remove()
}

const deleteAllNotes = () => {
  while (notesBox.lastChild) {
    notesBox.removeChild(notesBox.lastChild)
  }
}

const prepareDomEvents = () => {
  addNoteBtn.addEventListener('click', toggleAddNoteMode)
  clearAllBtn.addEventListener('click', deleteAllNotes)

  categoryElem.addEventListener('focusout', checkElemIsEmpty)
  noteContentElem.addEventListener('focusout', checkElemIsEmpty)
  saveNoteBtn.addEventListener('click', saveNote)
  cancelNoteBtn.addEventListener('click', toggleAddNoteMode)
  
  notesBox.addEventListener('click', checkClickOnNote)
}

const main = () => {
  prepareDomEvents()
}

document.addEventListener('DOMContentLoaded', main)