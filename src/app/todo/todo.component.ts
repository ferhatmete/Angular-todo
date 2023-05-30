import { Component, Input, OnInit } from '@angular/core';
import { DoneTask, Modal, OngoingTask, Task, TestingTask } from '../modal';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() creatorName: string = '';
  taskName: string = '';
  author: string = '';
  taskDetail: string = '';
  status: string = 'todo';
  priority: string = '';
  id: number = 1;
  modal: Modal = new Modal();
  showModal: boolean = false;
  selectedTask: Task | OngoingTask | TestingTask | DoneTask | undefined;
  tasks: Task[] = [];
  ongoingTasks: OngoingTask[] = [];
  testingTasks: TestingTask[] = [];
  doneTasks: DoneTask[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    const task: Task = {
      name: this.taskName,
      author: this.author,
      taskDetail: this.taskDetail,
      priority: this.priority,
      status: this.status,
      id: this.id++,
    };

    this.taskStatus(task);
    this.tasks.push(task);
    this.saveTasks();
    this.taskName = '';
    this.taskDetail = '';
    this.author = '';
    this.priority = '';
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }

    const ongoingIndex = this.ongoingTasks.indexOf(task);
    if (ongoingIndex !== -1) {
      this.ongoingTasks.splice(ongoingIndex, 1);
      this.saveTasks();
    }

    const testingIndex = this.testingTasks.indexOf(task);
    if (testingIndex !== -1) {
      this.testingTasks.splice(testingIndex, 1);
      this.saveTasks();
    }

    const doneIndex = this.doneTasks.indexOf(task);
    if (doneIndex !== -1) {
      this.doneTasks.splice(doneIndex, 1);
      this.saveTasks();
    }
  }

  taskStatus(task: Task | OngoingTask | TestingTask | DoneTask) {
    if (task.priority === 'highest') {
      return 'task-highest';
    } else if (task.priority === 'high') {
      return 'task-high';
    } else if (task.priority === 'low') {
      return 'task-low';
    } else if (task.priority === 'lowest') {
      return 'task-lowest';
    }

    return '';
  }

  saveTasks() {
    const allTasks = {
      tasks: this.tasks,
      ongoingTasks: this.ongoingTasks,
      testingTasks: this.testingTasks,
      doneTasks: this.doneTasks,
    };

    localStorage.setItem('allTasks', JSON.stringify(allTasks));
  }

  // Update tasks modal input

  updateTask() {
    if (this.selectedTask) {
      this.saveTasks();
      this.closeModal();
      // this.taskDetail = ''; // taskDetail'i sıfırla
    }
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('allTasks');
    if (storedTasks) {
      const allTasks = JSON.parse(storedTasks);
      this.tasks = allTasks.tasks || [];
      this.ongoingTasks = allTasks.ongoingTasks || [];
      this.testingTasks = allTasks.testingTasks || [];
      this.doneTasks = allTasks.doneTasks || [];
    }
  }

  countTasks(): number {
    return (
      this.tasks.length +
      this.ongoingTasks.length +
      this.testingTasks.length +
      this.doneTasks.length
    );
  }

  openModal(task: Task | OngoingTask | TestingTask | DoneTask) {
    this.selectedTask = task;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  moveToOngoing(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.ongoingTasks.push(task);
      task.status = 'ongoing';
      this.saveTasks();
    }
  }

  moveToTesting(task: OngoingTask) {
    const index = this.ongoingTasks.indexOf(task);
    if (index !== -1) {
      this.ongoingTasks.splice(index, 1);
      this.testingTasks.push(task);
      task.status = 'testing';
      this.saveTasks();
    }
  }

  moveToDone(task: TestingTask) {
    const index = this.testingTasks.indexOf(task);
    if (index !== -1) {
      this.testingTasks.splice(index, 1);
      this.doneTasks.push(task);
      task.status = 'done';
      this.saveTasks();
    }
  }
}
