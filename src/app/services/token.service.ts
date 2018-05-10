import {Injectable} from '@angular/core';
import {DbService} from './db.service';
import {Subject} from 'rxjs/Subject';
import * as md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private dbService: DbService) {
  }

  getList() {
    const s$ = new Subject();
    const tx = this.dbService.db.transaction(['token-list']);
    const rq = tx.objectStore('token-list').getAll();
    rq.onsuccess = event => s$.next(event.target.result);
    return s$;
  }

  add(token: string = '') {
    const s$ = new Subject();
    const tx = this.dbService.db.transaction(['token-list'], 'readwrite');
    const hash = token ? md5(token) : '';
    const rq = tx.objectStore('token-list').add({token, hash});
    rq.onsuccess = event => s$.next(event.target.result);
    // rq.onerror = event => s$.next();
    return s$;
  }

  delete(id) {
    const s$ = new Subject();
    const tx = this.dbService.db.transaction(['token-list'], 'readwrite');
    const rq = tx.objectStore('token-list').delete(id);
    rq.onsuccess = event => s$.next(event.target.result);
    return s$;
  }

  update(id, token: string) {
    const s$ = new Subject();
    const tx = this.dbService.db.transaction(['token-list'], 'readwrite');
    const hash = token ? md5(token) : '';
    const rq = tx.objectStore('token-list').put({id, token, hash});
    rq.onsuccess = event => s$.next(event.target.result);
    // rq.onerror = event => s$.next();
    return s$;
  }
}