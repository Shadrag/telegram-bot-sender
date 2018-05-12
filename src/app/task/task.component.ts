import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskObject = null;
  text: string;

  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {
  }

  get message() {
    return _.get(this.taskObject, 'message');
  }

  set message(value) {
    this.taskObject['message'] = value;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (_.isEmpty(id)) {
      if (_.isEmpty(this.taskService.dataNewTask)) {
        this.router.navigate(['/task-list']);
      } else {
        // create new task
        const d = this.taskService.dataNewTask;
        this.taskObject = {
          project: _.get(d, 'title', '<no value>'),
          hash: _.get(d, 'hash', null),
          date: moment(_.get(d, 'createDate')).format('DD-MM-YYYY'),
        };
      }
    } else {
      // edit existing task
    }


  }

  save(){

  }

  cancel(){

  }

}
