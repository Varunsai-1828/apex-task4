// To-Do List Logic
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
    taskList.appendChild(li);
  });
}

addTaskBtn.onclick = () => {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  }
};

renderTasks();

// Product Filter + Sort
const products = [
  { name: "Laptop", category: "electronics", price: 999, rating: 4.7 },
  { name: "Smartphone", category: "electronics", price: 699, rating: 4.5 },
  { name: "Book: JavaScript", category: "books", price: 29, rating: 4.8 },
  { name: "Book: CSS Mastery", category: "books", price: 25, rating: 4.3 }
];

const productContainer = document.getElementById("products");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");

function displayProducts() {
  let filtered = [...products];

  if (filter.value !== "all") {
    filtered = filtered.filter(p => p.category === filter.value);
  }

  if (sort.value === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort.value === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  productContainer.innerHTML = "";
  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<strong>${p.name}</strong> - ${p.category} - $${p.price} - ⭐ ${p.rating}`;
    productContainer.appendChild(div);
  });
}

filter.onchange = sort.onchange = displayProducts;

displayProducts();
