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
    console.log('get token list');
    return [];
  }

  add(token: string = '') {
    const s$ = new Subject();
    const tx = this.dbService.db.transaction(['token-list'], 'readwrite');
    const hash = token ? md5(token) : '';
    const rq = tx.objectStore('token-list').add({token, hash});
    rq.onsuccess = event => s$.next(event);
    // rq.onerror = event => s$.next();
    return s$;
  }

  delete(id) {
    console.log('delete token');
  }

  update(id, token: string) {
    console.log('update token');
  }
}
