export class Modal {
  tasks: Task[] = [];
  ongoingTasks: OngoingTask[] = [];
  testingTasks: TestingTask[] = [];
  doneTasks: DoneTask[] = [];
}

export class Task {
  constructor(
    public name: string,
    public author: string,
    public status: string = 'todo',
    public priority: string,
    public id: number
  ) {}
}

export class OngoingTask extends Task {
  constructor(
    name: string,
    author: string,
    priority: string
  ) {
    super(name, author, 'ongoing', priority, 0);
  }
}

export class TestingTask extends Task {
  constructor(
    name: string,
    author: string,
    priority: string
  ) {
    super(name, author, 'testing', priority, 0);
  }
}

export class DoneTask extends Task {
  constructor(
    name: string,
    author: string,
    priority: string
  ) {
    super(name, author, 'done', priority, 0);
  }
}
