import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = null;

  constructor() {
    console.log('init _db service');
    const model = this;
    const requestDB = indexedDB.open('TelegramBotSender', 1);

    requestDB.onerror = function (event) {
      alert('Could not access IndexedDB.');
    };

    requestDB.onsuccess = function (event) {
      model.db = (<IDBOpenDBRequest>event.target).result;

      model.db.onerror = function (e) {
        alert('Database error: ' + e.target.errorCode);
      };
    };

    requestDB.onupgradeneeded = function (event) {
      const local_db = (<IDBOpenDBRequest>event.target).result;

      const objectStore = local_db.createObjectStore('token-list', {keyPath: 'id', autoIncrement: true});
      objectStore.createIndex('id', 'id', {unique: true});
    };


  }


  test() {
    // console.log('test');
  }


}
