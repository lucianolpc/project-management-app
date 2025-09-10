class Project {
  constructor(title, description, dueDate, tasks = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
  }

  addTask() {
    // Code to add a task to the list of tasks here
  }
}

export default Project;