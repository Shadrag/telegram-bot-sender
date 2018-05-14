import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
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
    const id = +this.route.snapshot.paramMap.get('id');

    this.taskForm = new FormGroup({
      id: new FormControl(),
      project: new FormControl(),
      date: new FormControl(),
      hash: new FormControl(),
      label: new FormControl(),
      message: new FormControl(),
    });

    if (!id) {
      if (_.isEmpty(this.taskService.dataNewTask)) {
        this.router.navigate(['/task-list']);
      } else {
        // create new task
        this.taskForm.patchValue(this.taskService.dataNewTask);
      }
    } else {
      // edit existing task
      this.taskService.loadTask(id)
        .subscribe(task => {
          console.log(task);
          this.taskForm.patchValue(task);
        });
    }

  }

  get isNewTask() {
    const id = +this.route.snapshot.paramMap.get('id');
    return !id && !_.isEmpty(this.taskService.dataNewTask);
  }

  get isExistingTask() {
    const id = +this.route.snapshot.paramMap.get('id');
    return !!id;
  }

  get isFoundedToken() {
    const hash = this.taskForm.value.hash;
    return !_.isEmpty(_.find(this.tokenService.tokenList$.getValue(), {hash}));
  }

  create() {
    const fo = this.taskForm.value;
    const nt = this.taskService.dataNewTask;
    this.taskService.addTask({
        project: nt.project,
        date: nt.date,
        hash: nt.hash,
        label: fo.label,
        message: fo.message
      }
    ).subscribe(id => {
      this.router.navigate(['task', id]);
    });
  }

  update() {

    this.taskService.updateTask(this.taskForm.value)
      .subscribe(id => {
        this.router.navigate(['task', id]);
      });
  }

}
