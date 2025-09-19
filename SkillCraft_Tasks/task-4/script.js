const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = taskDateTime.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = `${taskText} ${taskDate ? ` (📅 ${taskDate})` : ""}`;

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete");
  completeBtn.onclick = () => li.classList.toggle("completed");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.classList.add("edit");
  editBtn.onclick = () => editTask(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => li.remove();

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);

  taskInput.value = "";
  taskDateTime.value = "";
}

function editTask(span) {
  const newTask = prompt("Edit your task:", span.textContent);
  if (newTask !== null && newTask.trim() !== "") {
    span.textContent = newTask;
  }
}
