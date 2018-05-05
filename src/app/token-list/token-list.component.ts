import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  constructor(private dbService: DbService) {
  }

  ngOnInit() {
    this.dbService.test();
  }

}
