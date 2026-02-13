class TodoList {
  constructor() {
    this.todos = [];
  }

  // To jest funkcja, którą będziemy mocno testować pod kątem XSS
  addTask(title) {
    if (!title || typeof title !== "string") return;

    const newTask = {
      id: Date.now(),
      title: title, // Tutaj trafi potencjalny złośliwy kod
      completed: false,
    };

    this.todos.push(newTask);
    return newTask;
  }

  deleteTask(id) {
    this.todos = this.todos.filter((task) => task.id !== id);
  }

  toggleTask(id) {
    const task = this.todos.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  }
}

// Inicjalizacja i obsługa DOM
const myTodo = new TodoList();

function renderTask(task) {
  const li = document.createElement("li");
  // UWAGA: Użycie textContent zamiast innerHTML to pierwsza linia obrony przed XSS!
  li.textContent = task.title;
  document.getElementById("task-list").appendChild(li);
}

// Przykład dodawania zadania przez UI
document.getElementById("add-btn").addEventListener("click", () => {
  const input = document.getElementById("task-input");
  const task = myTodo.addTask(input.value);
  if (task) {
    renderTask(task);
    input.value = "";
  }
});
