let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => {
      tasks.push(task)
    })
    updateStates();
    updateTasksList();
  }
})

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
  }
  updateTasksList();
  updateStates();
  saveTasks();
}


const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateStates();
  saveTasks();
}

const updateStates = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`

  let numbers = document.getElementById("numbers");
  numbers.innerText = `${completedTasks} / ${totalTasks}`;

  if (tasks.length && completedTasks === totalTasks) {
    fireWork();
  }
}

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStates();
  saveTasks();
}

const editTask = (index) => {
  let taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStates();
  saveTasks();
}

const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItems">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="images/icons8-edit-100.png" alt="" onClick="editTask(${index})" />
          <img src="./images/icons8-delete-96.png" alt="" onClick="deleteTask(${index})" />
        </div>
      </div>
    `;

    // ✅ Now attach the event directly to the checkbox
    const checkbox = listItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => {
      toggleTaskComplete(index);
      updateTasksList();
    });

    taskList.append(listItem);
  });
};



document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
})


// ---------------------------------------------------------------
const fireWork = () => {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration;

  let skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = animationEnd - Date.now(),
      ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: ["circle"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}