import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private router: Router, private taskService: TaskService) {
  }

  taskList = [];

  ngOnInit() {
    this.taskService.getList()
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
}
