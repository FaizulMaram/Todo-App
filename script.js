//Display Current Date
let date = new Date();
document.getElementById("date").innerHTML = date.toDateString();

// Load tasks from localStorage on page load
window.onload = function() {
    loadTasks();
};

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue,
            completed: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

//Add Task Button Functionality
function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }
    createTaskElement(taskInput, false);
    document.getElementById("taskInput").value = "";
    saveTasks();
}

function createTaskElement(taskText, completed) {
    let newTask = document.createElement("li");
    let taskList = document.getElementById("taskList");
    newTask.innerHTML = taskText;
    if (completed) {
        newTask.style.textDecoration = "line-through";
    }
    taskList.appendChild(newTask);

    deleteTask(newTask);
    completeTask(newTask);
    editTask(newTask);
}

//Delete Task Functionality
function deleteTask(newTask) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    newTask.appendChild(deleteBtn);
    deleteBtn.onclick = function() {
        newTask.remove();
        saveTasks();
    };
}

//Complete Task Functionality
function completeTask(newTask) {
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = newTask.style.textDecoration === "line-through" ? "Undone" : "Done";
    newTask.appendChild(completeBtn);
    completeBtn.onclick = function() {
        if (newTask.style.textDecoration === "line-through") {
            newTask.style.textDecoration = "none";
            completeBtn.innerHTML = "Done";
        } else {
            newTask.style.textDecoration = "line-through";
            completeBtn.innerHTML = "Undone";
        }
        saveTasks();
    };
}

//Edit Task Functionality
function editTask(newTask) {
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    newTask.appendChild(editBtn);
    editBtn.onclick = function() {
        let editedTask = prompt("Edit your task:", newTask.firstChild.nodeValue);
        if (editedTask !== null && editedTask !== "") {
            newTask.firstChild.nodeValue = editedTask;
            saveTasks();
        }
    };
}