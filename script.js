let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((t, index) => {
    let li = document.createElement("li");

    if (t.done) {
      li.classList.add("completed");
      completed++;
    }

    li.innerHTML = `
      <div class="task-content">
        <h3>${t.subject}</h3>
        <p>${t.task}</p>
        <small>⏰ ${t.time}</small>
      </div>

      <div class="task-buttons">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = tasks.length;
  document.getElementById("completed").innerText = completed;
  document.getElementById("remaining").innerText = tasks.length - completed;
}

function addTask() {
  let subject = document.getElementById("subject").value;
  let task = document.getElementById("task").value;
  let time = document.getElementById("time").value;

  if (!subject || !task || !time) {
    alert("Please fill all fields!");
    return;
  }

  tasks.push({
    subject,
    task,
    time,
    done: false
  });

  saveTasks();
  renderTasks();

  document.getElementById("subject").value = "";
  document.getElementById("task").value = "";
  document.getElementById("time").value = "";
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Load tasks on start
renderTasks();