// import { Component, Input, OnInit } from '@angular/core';
// import { DoneTask, Modal, OngoingTask, Task, TestingTask } from '../modal';

// @Component({
//   selector: 'app-todo-list',
//   templateUrl: './todo.component.html',
//   styleUrls: ['./todo.component.scss'],
// })
// export class TodoListComponent implements OnInit {
//   @Input() creatorName: string = '';
//   taskName: string = '';
//   author: string = '';
//   status: string = 'todo';
//   priority: string = '';
//   backgroundColor: string = '';
//   id: number = 1;
//   modal: Modal = new Modal();
//   tasksByStatus: { [status: string]: Task[] } = {};
//   tasks: Task[] = [];

//   ngOnInit() {
//     this.loadTasks();
//     this.groupTasksByStatus();
//   }

//   addTask() {
//     // Görevi oluşturun
//     const task: Task = {
//       name: this.taskName,
//       author: this.author,
//       priority: this.priority,
//       backgroundColor: '',
//       status: this.status,
//       id: this.id++,
//     };

//     // Arka plan rengini belirlemek için taskStatus() işlevini çağırıyoruz
//     this.taskStatus(task);

//     // Görevi ilgili durum listesine ekleyin
//     this.tasksByStatus[task.status].push(task);

//     // Görevleri kaydedin
//     this.saveTasks();

//     // Form alanlarını sıfırlayın
//     this.taskName = '';
//     this.author = '';
//     this.priority = '';
//   }

//   groupTasksByStatus() {
//     this.tasksByStatus = {
//       todo: this.tasks.filter(task => task.status === 'todo'),
//       ongoing: this.tasks.filter(task => task.status === 'ongoing'),
//       testing: this.tasks.filter(task => task.status === 'testing'),
//       done: this.tasks.filter(task => task.status === 'done')
//     };
//   }

//   deleteTask(task: Task) {
//     const status = task.status;

//     // Görevi ilgili durum listesinden silin
//     const index = this.tasksByStatus[status].indexOf(task);
//     if (index !== -1) {
//       this.tasksByStatus[status].splice(index, 1);
//       this.saveTasks();
//     }
//   }
  

//   taskStatus(task: Task | OngoingTask | TestingTask | DoneTask) {
//     if (task.priority === 'highest') {
//       task.backgroundColor = '#FF0000'; // Kırmızı arka plan rengi
//     } else if (task.priority === 'high') {
//       task.backgroundColor = '#FFA500'; // Turuncu arka plan rengi
//     } else if (task.priority === 'low') {
//       task.backgroundColor = '#FFFF00'; // Sarı arka plan rengi
//     } else if (task.priority === 'lowest') {
//       task.backgroundColor = '#00FF00'; // Yeşil arka plan rengi
//     }
//   }

//   saveTasks() {
//     localStorage.setItem('allTasks', JSON.stringify(this.tasksByStatus));
//   }

//   moveToOngoing(task: Task) {
//     const status = task.status;

//     // Görevi ilgili durum listesinden kaldırın
//     const index = this.tasksByStatus[status].indexOf(task);
//     if (index !== -1) {
//       this.tasksByStatus[status].splice(index, 1);

//       // Durumu güncelleyin ve yeni durum listesine ekleyin
//       task.status = 'ongoing';
//       this.tasksByStatus[task.status].push(task);

//       // Görevleri kaydedin
//       this.saveTasks();
//     }
//   }

//   moveToTesting(task: OngoingTask) {
//     const status = task.status;

//     // Görevi ilgili durum listesinden kaldırın
//     const index = this.tasksByStatus[status].indexOf(task);
//     if (index !== -1) {
//       this.tasksByStatus[status].splice(index, 1);

//       // Durumu güncelleyin ve yeni durum listesine ekleyin
//       task.status = 'testing';
//       this.tasksByStatus[task.status].push(task);

//       // Görevleri kaydedin
//       this.saveTasks();
//     }
//   }
  
//   moveToDone(task: TestingTask) {
//     const status = task.status;

//     // Görevi ilgili durum listesinden kaldırın
//     const index = this.tasksByStatus[status].indexOf(task);
//     if (index !== -1) {
//       this.tasksByStatus[status].splice(index, 1);

//       // Durumu güncelleyin ve yeni durum listesine ekleyin
//       task.status = 'done';
//       this.tasksByStatus[task.status].push(task);

//       // Görevleri kaydedin
//       this.saveTasks();
//     }
//   }

//   loadTasks() {
//     const storedTasks = localStorage.getItem('allTasks');
//     if (storedTasks) {
//       this.tasksByStatus = JSON.parse(storedTasks);
//     }
//   }
// }

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
      priority: this.priority,
      status: this.status,
      id: this.id++,
    };

    this.taskStatus(task);
    this.tasks.push(task);
    this.saveTasks();
    this.taskName = '';
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

  loadTasks() {
    const storedTasks = localStorage.getItem('allTasks');
    if (storedTasks) {
      const allTasks = JSON.parse(storedTasks);
      this.tasks = allTasks.tasks;
      this.ongoingTasks = allTasks.ongoingTasks;
      this.testingTasks = allTasks.testingTasks;
      this.doneTasks = allTasks.doneTasks;
    }
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

