import {Injectable} from '@angular/core';
import {DbService} from './db.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataNewTask = {
    'title': 'Bot Bot',
    'createDate': 1525446199,
    'hash': '2a30954845b40ff957e44f10891fcf59',
    'chats': ['121212', '131313']
  };

  constructor(private dbService: DbService) {
  }
}
