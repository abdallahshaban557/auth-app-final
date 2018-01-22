import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import { ListsService } from '../../services/lists.service';
import { List } from '../../classes/listClass';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
  selector: 'app-parent-lists',
  templateUrl: './parent-lists.component.html',
  styleUrls: ['./parent-lists.component.css']
})
export class ParentListsComponent implements OnInit {

  //initial parent lists
  lists: any;

  //Child lists
  child_lists: List[] = [];
  pending_lists: List[] = [];
  completed_lists: List[] = [];

  //added new list
  added_list = new List();

  //variable for parent list that is filled after one of the main lists is clicked
  parent_list = new List();

  user = JSON.parse(localStorage.getItem('user'));
  

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

  addNewParentList() {
    this.added_list.created_by = this.user.id;
    //maybe find a way to fill in the description later on for the parent list
    this.added_list.description = "";
    this.listsService.addParentList(this.added_list).subscribe(data =>{
      if(data.success){
        console.log(data.payload);
      
        this.lists.push(data.payload);
        //keep this as the last line of code, to clear the textbox
        this.added_list = new List();
      }
      else{
        console.log("Something wrong happened");
      }
      
      
    });
  }


  getChildLists(parent_list) {
    //empty any previous lists before adding in the new ones

    this.parent_list = parent_list;

    this.child_lists = [];
    this.pending_lists =[];
    this.completed_lists = [];

    this.listsService.getChildLists(parent_list._id).subscribe(lists => {
      //retrieve list from API
      this.child_lists = lists.payload;
      //place list in completed or pending
      console.log(this.child_lists);
      this.child_lists.forEach(list =>{
        if (list.done == 0)
         { this.pending_lists.push(list); 
          console.log("pending");}
        else
        {  this.completed_lists.push(list);
           console.log("completed");}
      })

      console.log(this.pending_lists);
      
    },
    err => {
      console.log(err);
      return false;
    });
  }

  editListName(child_list){
    this.listsService.editListName(child_list).subscribe(data =>{
      if(data.success){
        console.log(data.payload);
      }
      else{
        console.log("Something wrong happened");
      }
      
  })
}

}
