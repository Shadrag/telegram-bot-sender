import {Component, OnInit, ViewChild} from '@angular/core';
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
  displayTokenEditor = false;
  currentEditingId = null;

  @ViewChild('tokenEditor') tokenEditor;


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
    this.currentEditingId = null;
    this.tokenEditor.nativeElement.value = '';
    this.displayTokenEditor = true;
  }

  edit(token) {
    this.tokenEditor.nativeElement.value = (token.token === '<no value>') ? '' : token.token;
    this.currentEditingId = token.id;
    this.displayTokenEditor = true;
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
      },
      reject: () => {
      }
    });
  }

  editorCancel() {
    this.tokenEditor.nativeElement.value = '';
    this.displayTokenEditor = false;
  }

  editorSave() {
    (_.isEmpty(this.currentEditingId)
      ? this.tokenService.add(this.tokenEditor.nativeElement.value)
      : this.tokenService.update(this.currentEditingId, this.tokenEditor.nativeElement.value))
      .subscribe(v => {
        this.reloadList$.next(true);
      });

    this.displayTokenEditor = false;
  }

}
