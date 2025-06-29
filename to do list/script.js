document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
      if (currentFilter === "all") return true;
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
    });

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button class="complete-btn" data-index="${index}">✔</button>
          <button class="delete-btn" data-index="${index}">✖</button>
        </div>
      `;

      taskList.appendChild(li);
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }

  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
  });

  taskList.addEventListener("click", e => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("complete-btn")) {
      toggleComplete(index);
    } else if (e.target.classList.contains("delete-btn")) {
      deleteTask(index);
    }
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  renderTasks(); // Initial render
});
