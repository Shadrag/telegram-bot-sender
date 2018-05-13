import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenService} from '../services/token.service';
import * as _ from 'lodash';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  displayTokenEditor = false;
  currentEditingId = null;

  @ViewChild('tokenEditor') tokenEditor;

  constructor(public tokenService: TokenService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    if (this.tokenService.tokenList$.getValue().length === 0) this.tokenService.loadList();
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
            this.tokenService.loadList();
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
        this.tokenService.loadList();
      });

    this.displayTokenEditor = false;
  }

}
