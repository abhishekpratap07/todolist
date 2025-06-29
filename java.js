const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("todo-butn");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage if they exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save to localStorage
function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create a <li> from task object
function createTaskElement(task) {
  const newItem = document.createElement("li");
  newItem.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    newItem.remove();
    tasks = tasks.filter(t => t.id !== task.id);  // remove from array
    saveTasksToStorage(); // update localStorage
    console.log("Task deleted:", task.id);
  });

  newItem.appendChild(deleteBtn);
  todoList.appendChild(newItem);
}

// Render any tasks from storage on load
tasks.forEach(task => createTaskElement(task));

// Add new task
addTaskButton.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  createTaskElement(newTask);
  saveTasksToStorage();

  todoInput.value = "";
  console.log("All tasks:", tasks);
});
