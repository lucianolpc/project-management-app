class Project {
  constructor(id, title, description, dueDate, tasks = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate)
    this.tasks = tasks;
  }

  addTask(taskName) {
    // Cria uma task e adiciona no final da lista de tasks
    const id = crypto.randomUUID();
    const task = new Task(id, taskName);
    // Quando usei o método push causou duplicações, então fiz a adição na lista desta maneira.
    this.tasks = [...this.tasks, task];
  }

  removeTask(taskId) {
    // Filtra a lista de tasks original deixando apenas aquelas cujo id não é o indicado
    const newTasks = this.tasks.filter(task => task.id != taskId);
    // Susbstitui a lista antiga pela nova
    this.tasks = [...newTasks];
  }

  formatedDate() {
    return this.dueDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

class Task {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default Project;