import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-parent-lists',
  templateUrl: './parent-lists.component.html',
  styleUrls: ['./parent-lists.component.css']
})
export class ParentListsComponent implements OnInit {

  lists: object;

  constructor(private listsService:ListsService, private router:Router) { }

  ngOnInit() {
    this.listsService.getParentLists().subscribe(lists => {
      this.lists = lists.payload;
      console.log(this.lists);
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
