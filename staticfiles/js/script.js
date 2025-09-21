const taskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    if(filter === 'active' && task.completed) return;
    if(filter === 'completed' && !task.completed) return;

    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if(text === '') return;
  tasks.push({ text, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
});

// Toggle task completed
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Filter tasks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => renderTasks(btn.dataset.filter));
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial render
renderTasks();
