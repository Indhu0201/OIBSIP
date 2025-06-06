let isDark = false;

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  isDark = !isDark;
});

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const category = document.getElementById('taskCategory').value;
  const dueDate = document.getElementById('taskDue').value;

  if (!title) return alert("Please enter a task title!");

  const task = {
    id: Date.now(),
    title,
    desc,
    priority,
    category,
    dueDate,
    completed: false
  };

  renderTask(task);
  clearInputs();
}

function renderTask(task) {
  const list = task.completed ? document.getElementById('completedTasks') : document.getElementById('pendingTasks');

  const li = document.createElement('li');
  li.className = task.priority;
  li.setAttribute('data-id', task.id);

  li.innerHTML = `
    <strong>${task.title}</strong> (${task.category})<br>
    <span class="meta">${task.desc} - Due: ${task.dueDate}</span><br>
    ${!task.completed ? `
    <button class="complete-btn" onclick="markComplete(${task.id})">✔️ Done</button>
    <button class="edit-btn" onclick="editTask(${task.id})">✏️ Edit</button>
    ` : ''}
    <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Delete</button>
  `;

  list.appendChild(li);
}

function clearInputs() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskPriority').value = 'low';
  document.getElementById('taskCategory').value = 'work';
  document.getElementById('taskDue').value = '';
}

function markComplete(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  if (li) {
    li.remove();
    const task = {
      id,
      title: li.querySelector('strong').innerText,
      desc: li.querySelector('.meta').innerText.split(' - Due: ')[0],
      dueDate: li.querySelector('.meta').innerText.split(' - Due: ')[1],
      category: li.innerHTML.match(/\((.*?)\)/)[1],
      priority: li.className,
      completed: true
    };
    renderTask(task);
  }
}

function deleteTask(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  if (li) li.remove();
}

function editTask(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  if (!li) return;

  document.getElementById('taskTitle').value = li.querySelector('strong').innerText;
  document.getElementById('taskDesc').value = li.querySelector('.meta').innerText.split(' - Due: ')[0];
  document.getElementById('taskDue').value = li.querySelector('.meta').innerText.split(' - Due: ')[1];
  document.getElementById('taskCategory').value = li.innerHTML.match(/\((.*?)\)/)[1];
  document.getElementById('taskPriority').value = li.className;

  li.remove();
}

document.getElementById('searchBox').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  document.querySelectorAll('#pendingTasks li, #completedTasks li').forEach(task => {
    const text = task.innerText.toLowerCase();
    task.style.display = text.includes(keyword) ? 'block' : 'none';
  });
});
