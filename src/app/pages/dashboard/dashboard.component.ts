import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  tasks: any[] = [];

  task = {
    id: 0,
    taskName: '',
    description: '',
    isCompleted: false
  };

  searchText: string = '';
  sortField: string = 'taskName';
  sortAsc: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  get filteredTasks() {
    let data = [...this.tasks];

    if (this.searchText) {
      data = data.filter(t =>
        t.taskName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        t.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    data = data.sort((a, b) => {
      let valA = a[this.sortField];
      let valB = b[this.sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });

    return data;
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }

  saveTask() {
    if (this.task.id === 0) {
      this.taskService.addTask(this.task).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    } else {
      this.taskService.updateTask(this.task.id, this.task)
        .subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
    }
  }

  editTask(item: any) {
    this.task = { ...item };
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  resetForm() {
    this.task = {
      id: 0,
      taskName: '',
      description: '',
      isCompleted: false
    };
  }
}