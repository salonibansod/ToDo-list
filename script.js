function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    if (!itemName || !deadline || !priority) {
        alert('Please fill all fields');
        return;
    }
    const todos = getTodos();
    todos.push({ name: itemName, date: deadline, priority: priority, completed: false });
    saveTodos(todos);
    displayTasks();
}

function deleteItem(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    displayTasks();
}

function toggleComplete(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    displayTasks();
}

function displayTasks() {
    const todayTasks = document.getElementById('todayTasks');
    const futureTasks = document.getElementById('futureTasks');
    const completedTasks = document.getElementById('completedTasks');

    todayTasks.innerHTML = '';
    futureTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    const todos = getTodos();
    const today = new Date().toISOString().split('T')[0];

    todos.forEach((todo, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item' + (todo.completed ? ' completed' : '');
        taskItem.innerHTML = `${todo.name} - ${todo.date} - ${todo.priority}
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="deleteItem(${index})">✖</button>`;

        if (todo.completed) {
            completedTasks.appendChild(taskItem);
        } else if (todo.date === today) {
            todayTasks.appendChild(taskItem);
        } else {
            futureTasks.appendChild(taskItem);
        }
    });
}

displayTasks();
