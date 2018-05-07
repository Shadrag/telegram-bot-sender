import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  constructor(private dbService: DbService, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.dbService.test();
  }

  addNewToken() {
    this.tokenService.add()
      .subscribe(v => {
        console.log('added blank token');
      });

  }
}
