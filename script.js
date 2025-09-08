//Display Current Date
let date = new Date();
document.getElementById("date").innerHTML = date.toDateString();

//Add Task Button Functionality

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }

    let newTask = document.createElement("li");
    let taskList = document.getElementById("taskList");
    taskList.appendChild(newTask);
    
    newTask.innerHTML = taskInput;

    // Clear input field
    document.getElementById("taskInput").value = "";

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
    };
}

//Complete Task Functionality

function completeTask(newTask) {
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "Done";
    newTask.appendChild(completeBtn);
    completeBtn.onclick = function() {
        if (newTask.style.textDecoration === "line-through") {
            newTask.style.textDecoration = "none";
            completeBtn.innerHTML = "Done";
        } else {
            newTask.style.textDecoration = "line-through";
            completeBtn.innerHTML = "Undone";
        }
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
        }
    };
} 