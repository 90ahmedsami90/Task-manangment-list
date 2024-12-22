const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let isEditing = false; 
let currentTask = null;


function addTask() {
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task!");
    return;
  }

  if (isEditing && currentTask) {
    currentTask.querySelector("span").textContent = taskValue;
    isEditing = false; 
    currentTask = null;
    addTaskBtn.textContent = "Add";
  } else {
    
    const li = document.createElement("li");
    li.classList.add("task");

    li.innerHTML = `
      <span>${taskValue}</span>
      <div class="task-actions">
        <span class="edit">EDIT</span>
        <span class="completed">COMPLETED</span>
        <span class="delete">DELETE</span>
      </div>
    `;

    taskList.appendChild(li);


    addTaskActions(li);
  }

  
  taskInput.value = "";
}


function addTaskActions(task) {
  const editBtn = task.querySelector(".edit");
  const completedBtn = task.querySelector(".completed");
  const deleteBtn = task.querySelector(".delete");
  const taskText = task.querySelector("span");

  
  editBtn.addEventListener("click", () => {
    taskInput.value = taskText.textContent; 
    taskInput.focus();
    isEditing = true; 
    currentTask = task;
    addTaskBtn.textContent = "Update"; 
  });


  completedBtn.addEventListener("click", () => {
    taskText.style.textDecoration =
      taskText.style.textDecoration === "line-through" ? "none" : "line-through";
  });

  deleteBtn.addEventListener("click", () => {
    task.remove();
  });
}


addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
