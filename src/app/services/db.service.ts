import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = null;

  constructor() {
  }

  init() {
    console.log('init db service');
    const res$ = new Subject();
    const requestDB = indexedDB.open('TelegramBotSender', 1);
    const model = this;

    requestDB.onerror = event => alert('Could not access IndexedDB.');

    requestDB.onsuccess = function (event) {
      model.db = (<IDBOpenDBRequest>event.target).result;
      res$.complete();
      model.db.onerror = e => {
        // alert('Database error: ' + e.target.errorCode);
      };

    };

    requestDB.onupgradeneeded = function (event) {
      const local_db = (<IDBOpenDBRequest>event.target).result;

      const objectStore = local_db.createObjectStore('token-list', {keyPath: 'id', autoIncrement: true});
      objectStore.createIndex('id', 'id', {unique: true});
    };

    return res$;
  }


}
