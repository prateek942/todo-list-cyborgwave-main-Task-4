document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromLocalStorage();

    document.getElementById('add-task-button').addEventListener('click', addTask);
    document.getElementById('new-task').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const deadlineInput = document.getElementById('task-deadline');
    const taskText = taskInput.value.trim();
    const taskDeadline = deadlineInput.value;

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        
        const taskItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const timestampsDiv = document.createElement('div');
        timestampsDiv.className = 'timestamps';
        const addedTime = new Date().toLocaleString();
        timestampsDiv.innerHTML = `<div>Added: ${addedTime}</div><div>Due: ${taskDeadline ? new Date(taskDeadline).toLocaleString() : 'No deadline'}</div>`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText);
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(timestampsDiv);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        saveTaskToLocalStorage(taskText, addedTime, taskDeadline);

        taskInput.value = '';
        deadlineInput.value = '';
    }
}

function saveTaskToLocalStorage(task, addedTime, deadline) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, addedTime, deadline });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.task;

        const timestampsDiv = document.createElement('div');
        timestampsDiv.className = 'timestamps';
        timestampsDiv.innerHTML = `<div>Added: ${task.addedTime}</div><div>Due: ${task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}</div>`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(task.task);
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(timestampsDiv);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
