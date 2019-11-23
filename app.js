// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load EventListeners
loadEventListeners();

// Load all EventListeners

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)

  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask)

  // Clear all tasks event
  clearBtn.addEventListener('click', clearAll)

  // Filter task event
  filter.addEventListener('keyup', filterTasks)
}

// Get task from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Creat li element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item';
    // creat text node and append child to li
    li.appendChild(document.createTextNode(task))
    // creat link
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content'
    // add icon in link
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append link in li
    li.appendChild(link);
    // li append to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Hello  add a task');
  }
  
  // Creat li element
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item';
  // creat text node and append child to li
  li.appendChild(document.createTextNode(taskInput.value))
  // creat link
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content'
  // add icon in link
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // append link in li
  li.appendChild(link);
  // li append to ul
  taskList.appendChild(li);

  // Save in LS
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
}

// Task Save in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  
}

// Clear All tasks
function clearAll(e) {
  taskList.innerHTML = '';
}

// Filter task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display='block';
    } else {
      task.style.display = 'none';
    }
  })
}