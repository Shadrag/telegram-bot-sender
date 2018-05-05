import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = null;

  constructor() {
    console.log('init db service');
    let db = this.db;
    const request = indexedDB.open('TelegramBotSender', 1);

    request.onerror = function (event) {
      alert('Could not access IndexedDB.');
    };

    request.onsuccess = function (event) {
      db = (<IDBOpenDBRequest>event.target).result;

      db.onerror = function (e) {
        alert('Database error: ' + e.target.errorCode);
      };
    };

    request.onupgradeneeded = function(event) {
      const _db = (<IDBOpenDBRequest>event.target).result;
      const objectStore = _db.createObjectStore('name', { keyPath: 'myKey' });
    };

  }

  test() {
    // console.log('test');
  }

}
