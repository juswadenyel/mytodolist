// Task functionality
const addBtn = document.getElementById("add-btn");
const newTask = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

addBtn.addEventListener("click", addTask);

function addTask() {
  if (!newTask.value.trim()) return;
  const li = document.createElement("li");
  li.textContent = newTask.value;

  // Complete / remove buttons
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.addEventListener("click", () => li.classList.toggle("completed"));
  li.appendChild(completeBtn);

  taskList.appendChild(li);
  newTask.value = "";
}

// Filters
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    Array.from(taskList.children).forEach(task => {
      task.style.display =
        filter === "all" ||
        (filter === "active" && !task.classList.contains("completed")) ||
        (filter === "completed" && task.classList.contains("completed"))
          ? "flex"
          : "none";
    });
  });
});

// Stars background animation
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let starsArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

function initStars() {
  starsArray = [];
  for (let i = 0; i < 200; i++) {
    starsArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  starsArray.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
    star.alpha += (Math.random() - 0.5) * 0.02;
    if (star.alpha <= 0) star.alpha = 0;
    if (star.alpha >= 1) star.alpha = 1;
  });
  requestAnimationFrame(animateStars);
}

initStars();
animateStars();
