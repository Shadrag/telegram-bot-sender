import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import * as _ from 'lodash';
import {ConfirmationService} from 'primeng/api';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  tokenList;
  reloadList$ = new BehaviorSubject(true);

  constructor(private tokenService: TokenService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.reloadList$
      .pipe(
        switchMap(() => this.tokenService.getList()))
      .subscribe((list) => {
        this.tokenList = _.map(list, v => ({
          id: v.id,
          hash: v.hash || '<no value>',
          token: v.token || '<no value>'
        }));
      });
  }

  addNewToken() {
    this.tokenService.add()
      .subscribe(v => {
        console.log('added blank token', v);
      });

  }

  edit(id) {

  }

  delete(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this token?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.tokenService.delete(id)
          .subscribe(value => {
            this.reloadList$.next(true);
          });
        // this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Record deleted'}];
      },
      reject: () => {
      }
    });
  }
}
