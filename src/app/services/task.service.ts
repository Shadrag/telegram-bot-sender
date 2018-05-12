import {Injectable} from '@angular/core';
import {DbService} from './db.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataNewTask = {
    'title': 'Bot Bot',
    'createDate': 1525446199,
    'hash': '213b661f24ea207df0ee3be35fca70ed',
    'chats': ['121212', '131313']
  };

  constructor(private dbService: DbService) {
  }
}
