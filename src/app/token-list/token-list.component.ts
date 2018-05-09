import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() {
    this.tokenService.getList()
      .subscribe(v => console.log(v));
  }

  addNewToken() {
    this.tokenService.add()
      .subscribe(v => {
        console.log('added blank token', v);
      });

  }
}
