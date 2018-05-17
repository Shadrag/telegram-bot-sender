import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../services/task.service';
import {ConfirmationService} from 'primeng/api';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private router: Router, private taskService: TaskService, private confirmationService: ConfirmationService) {
  }

  taskList = [];
  loadTaskList$ = new BehaviorSubject(false);

  ngOnInit() {
    this.loadTaskList$.pipe(
      switchMap(() => this.taskService.getList())
    )
      .subscribe(list => {
        this.taskList = <any>list;
      });
  }


  readFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.taskService.dataNewTask = JSON.parse(fileReader.result);
      this.router.navigate(['/task']);
    };
    fileReader.readAsText(event.files[0]);
  }

  delete(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {

        this.taskService.deleteTask(id)
          .subscribe(() => {
            this.loadTaskList$.next(true);
          });
      },
      reject: () => {
      }
    });
  }

}
