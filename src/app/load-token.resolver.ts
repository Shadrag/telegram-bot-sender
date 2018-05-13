import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {TokenService} from './services/token.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadTokenResolver implements Resolve<any> {
  constructor(private tokenService: TokenService) {
  }

  resolve() {
    const s$ = new BehaviorSubject([]);
    this.tokenService.getList()
      .subscribe(list => {
          this.tokenService.tokenList$.next(<any>list);
          s$.complete();
        }
      );
    return s$;
  }
}
