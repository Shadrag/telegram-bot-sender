import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  readFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.router.navigate(['/task']);
      console.log(fileReader.result);
    };
    fileReader.readAsText(event.files[0]);
  }
}
