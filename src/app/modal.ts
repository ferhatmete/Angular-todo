export class Modal {
  tasks: Task[] = [];
  ongoingTasks: OngoingTask[] = [];
  testingTasks: TestingTask[] = [];
  doneTasks: DoneTask[] = [];

  constructor() {
    this.loadTasks();
  }

  addTask(name: string, author: string, status: string, priority: string) {
    if (name && author && status && priority) {
      let task: Task | OngoingTask | TestingTask | DoneTask;
  
      if (status === 'todo') {
        task = new Task(name, author, status, priority);
        this.tasks.push(task);
      } else if (status === 'ongoing') {
        task = new OngoingTask(name, author, status, priority);
        this.ongoingTasks.push(task);
      } else if (status === 'testing') {
        task = new TestingTask(name, author, status, priority);
        this.testingTasks.push(task);
      } else if (status === 'done') {
        task = new DoneTask(name, author, status, priority);
        this.doneTasks.push(task);
      }
  
      this.saveTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('ongoingTasks', JSON.stringify(this.ongoingTasks));
    localStorage.setItem('testingTasks', JSON.stringify(this.testingTasks));
    localStorage.setItem('doneTasks', JSON.stringify(this.doneTasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  moveToOngoing(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.ongoingTasks.push(task);
      this.saveTasks();
    }
  }

  moveToTesting(task: OngoingTask) {
    const index = this.ongoingTasks.indexOf(task);
    if (index !== -1) {
      this.ongoingTasks.splice(index, 1);
      this.testingTasks.push(task);
      this.saveTasks();
    }
  }

  moveToDone(task: TestingTask) {
    const index = this.testingTasks.indexOf(task);
    if (index !== -1) {
      this.testingTasks.splice(index, 1);
      this.doneTasks.push(task);
      this.saveTasks();
    }
  }

}

export class Task {
  name: string;
  author: string;
  status: string = 'todo'
  priority: string;
;

  constructor(name: string, author: string, status: string, priority: string) {
    this.name = name;
    this.author = author;
    this.status = status;
    this.priority = priority;
  }
}

export class OngoingTask {
  name: string;
  author: string;
  status: string = 'ongoing'
  priority: string;
;

  constructor(name: string, author: string, status: string, priority: string) {
    this.name = name;
    this.author = author;
    this.status = status;
    this.priority = priority;
  }
}

export class TestingTask {
  name: string;
  author: string;
  status: string = 'testing'
  priority: string;
;

  constructor(name: string, author: string, status: string, priority: string) {
    this.name = name;
    this.author = author;
    this.status = status;
    this.priority = priority;
  }
}

export class DoneTask {
  name: string;
  author: string;
  status: string = 'done'
  priority: string;
;

  constructor(name: string, author: string, status: string, priority: string) {
    this.name = name;
    this.author = author;
    this.status = status;
    this.priority = priority;
  }
}

