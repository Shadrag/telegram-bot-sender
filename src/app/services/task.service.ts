import {Injectable} from '@angular/core';
import {DbService} from './db.service';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataNewTask = {
    'project': 'Bot Bot',
    'createDate': 1525446199,
    'hash': '2a30954845b40ff957e44f10891fcf59',
    'chats': ['121212', '131313']
  };

  constructor(private dbService: DbService) {
  }

  addTask(taskObject) {
    const s$ = new Subject();
    const tx = this.dbService.db.transaction(['task-list'], 'readwrite');
    const rq = tx.objectStore('task-list').add(taskObject);
    rq.onsuccess = event => s$.next(event.target.result);
    return s$;
  }

  updateTask() {

  }
}
