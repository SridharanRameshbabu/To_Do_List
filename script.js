let count = 0;

// Load tasks from localStorage on page load
window.onload = function () {
    loadTasks();
};

// Load tasks from localStorage and render them
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const container = document.getElementById("content");
    container.innerHTML = ''; // Clear existing tasks

    storedTasks.forEach(task => {
        addTaskElement(task.text, task.completed);
    });

    toggleContainerDisplay();
}

// Add a new task element to the UI
function addTaskElement(taskText, isCompleted = false) {
    const container = document.getElementById('content');

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskTextElement = document.createElement('h4');
    taskTextElement.textContent = taskText;
    if (isCompleted) {
        taskTextElement.style.textDecoration = "line-through";
    }

    taskTextElement.ondblclick = function () {
        taskTextElement.style.textDecoration = taskTextElement.style.textDecoration === "line-through" ? "none" : "line-through";
        saveData();
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = function () {
        const newText = prompt("Edit your task:", taskTextElement.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskTextElement.textContent = newText.trim();
            saveData();
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        taskItem.remove();
        saveData();
    };

    const buttons = document.createElement('div');
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(buttons);
    container.appendChild(taskItem);
}

// Function to add new task
function addElement() {
    const inputTaskValue = document.todo.task.value.trim();
    if (inputTaskValue === "") {
        alert("Please enter a task!");
        return;
    }

    addTaskElement(inputTaskValue);

    // Reset input and save data
    document.todo.task.value = "";
    saveData();
}

// Function to save tasks to localStorage in a structured format
function saveData() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        const taskTextElement = taskItem.querySelector('h4');
        const isCompleted = taskTextElement.style.textDecoration === "line-through";
        tasks.push({ text: taskTextElement.textContent, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    toggleContainerDisplay();
}

// Function to toggle container display based on task count
function toggleContainerDisplay() {
    const container = document.getElementById('content');
    container.style.display = document.querySelectorAll('.task-item').length === 0 ? "none" : "flex";
}
