import { Component, Input, OnInit } from '@angular/core';
import { DoneTask, Modal, OngoingTask, Task, TestingTask } from '../modal';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoListComponent implements OnInit {
  @Input() creatorName: string = '';
  taskName: string = '';
  author: string = '';
  status: string = '';
  priority: string = '';
  modal: Modal = new Modal();
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
      status: this.status,
      priority: this.priority
    };
  
    this.tasks.push(task);
    this.saveTasks();
    this.taskName = '';
    this.author = '';
    this.status = "";
    this.priority = '';
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
  
    const storedOngoingTasks = localStorage.getItem('ongoingTasks');
    if (storedOngoingTasks) {
      this.ongoingTasks = JSON.parse(storedOngoingTasks);
    }

    const storedTestingTasks = localStorage.getItem('testingTasks');
    if (storedTestingTasks) {
      this.testingTasks = JSON.parse(storedTestingTasks);
    }

    const storedDoneTasks = localStorage.getItem('doneTasks');
    if (storedDoneTasks) {
      this.doneTasks = JSON.parse(storedDoneTasks);
    }
  }

  moveToOngoing(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.ongoingTasks.push(task);
      this.status = 'ongoing';
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.saveTasks();
    }
  }

  moveToTesting(task: OngoingTask) {
    const index = this.ongoingTasks.indexOf(task);
    if (index !== -1) {
      this.ongoingTasks.splice(index, 1);
      this.testingTasks.push(task);
      this.status = 'testing';
      localStorage.setItem('ongoingTasks', JSON.stringify(this.ongoingTasks));
      this.saveTasks();
    }
  }

  moveToDone(task: TestingTask) {
    const index = this.testingTasks.indexOf(task);
    if (index !== -1) {
      this.testingTasks.splice(index, 1);
      this.doneTasks.push(task);
      this.status = 'done';
      localStorage.setItem('testingTasks', JSON.stringify(this.testingTasks));
      this.saveTasks();
    }
  }

}

