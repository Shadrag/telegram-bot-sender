import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  text: string;
  taskForm;

  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.taskForm = new FormGroup({
      project: new FormControl(),
      date: new FormControl(),
      token: new FormControl(),
      label: new FormControl(),
      message: new FormControl(),
    });

    let taskObject;

    if (_.isEmpty(id)) {
      if (_.isEmpty(this.taskService.dataNewTask)) {
        this.router.navigate(['/task-list']);
      } else {
        // create new task
        const d = this.taskService.dataNewTask;
        const hash = _.get(d, 'hash', null);
        taskObject = {
          project: _.get(d, 'title', '<no value>'),
          token: hash + (_.isEmpty(_.find(this.tokenService.tokenList$.getValue(), {hash})) ? ' (not found)' : ' (founded)'),
          date: moment(_.get(d, 'createDate') * 1000).format('DD-MM-YYYY'),
          message: '',
          label: ''
        };
      }
    } else {
      // edit existing task
    }

    this.taskForm.patchValue(taskObject);
  }

  save() {

  }

  cancel() {

  }

}
