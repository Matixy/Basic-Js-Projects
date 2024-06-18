let todoInput // miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadań / konieczności wpisania tekstu
let addBtn // prycisk ADD - dodaje nowe elementy do listy
let ulList // lista zadań tagi UL
// let newTodo // nowo dodany LI, nowe zadanie
let popup // popup
let popupInfo // tekst w popupie, jak sie doda pusty tekst
let todoToEdit // edytowany todo
let popupInput // input w popupie
let popupAddBtn // przycisk dodaj w popupie
let popupCloseBtn // przycisk anuluj w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	// pobieramy wszystkie elementy

	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	// nadajemy nasłuchiwanie

	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupAddBtn.addEventListener('click', changeTodoText)
	popupCloseBtn.addEventListener('click', closePopup)
	todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li')
		newTodo.dataset.id = ulList.querySelectorAll('li').length + 1
		newTodo.textContent = todoInput.value
		createToolsArea(newTodo)

		ulList.append(newTodo)

		errorInfo.textContent = ''
		todoInput.value = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const createToolsArea = (newTodo) => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
	newTodo.append(toolsPanel)
}

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editTodo = (e) => {
	todoToEdit = e.target.closest('li')
	popup.style.display = 'flex'

	popupInput.value = todoToEdit.firstChild.textContent
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value

		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = (e) => {
	(e.target.closest('li')).remove()

	if (ulList.children.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	} else {
		errorInfo.textContent = ''
	}
}

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		console.log('enter')
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)