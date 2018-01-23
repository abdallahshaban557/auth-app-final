import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import { ListsService } from '../../services/lists.service';
import { List } from '../../classes/listClass';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

//needed to be able to use jquery
declare var $ :any;

@Component({
  selector: 'app-parent-lists',
  templateUrl: './parent-lists.component.html',
  styleUrls: ['./parent-lists.component.css']
})
export class ParentListsComponent implements OnInit {

  //initial parent lists
  parent_lists: any;

  //Child lists
  child_lists: List[] = [];
  pending_lists: List[] = [];
  completed_lists: List[] = [];

  //added new parent list
  added_list = new List();

  added_child_list = new List();

  //variable for parent list that is filled after one of the main lists is clicked
  parent_list = new List();


  user = JSON.parse(localStorage.getItem('user'));
  


  constructor(private listsService:ListsService, private router:Router) { }

  ngOnInit() {
    //Fill in the parent lists the moment the component is loaded
    this.listsService.getParentLists().subscribe(lists => {
      this.parent_lists = lists.payload;
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
    if (this.added_list.name == null)
    {
      $('#newParentListTextBox').tooltip('show');
      
      //Hide tooltip after 2 seconds
      $('#newParentListTextBox').on('shown.bs.tooltip', function () {
        setTimeout(function(){
          $('#newParentListTextBox').tooltip('hide');
      }, 2000);
      })


      return;
    }

    this.listsService.addParentList(this.added_list).subscribe(data =>{
      if(data.success){
        this.parent_lists.push(data.payload);
        //keep this as the last line of code, to clear the textbox
        this.added_list = new List();
      }
      else{
        console.log("Something wrong happened");
      } 
    });
  }

  addNewChildList() {
    this.added_child_list.created_by = this.user.id;
    //maybe find a way to fill in the description later on for the parent list
    this.added_child_list.description = "";
    this.added_child_list.parent_list_id = this.parent_list._id;
    this.added_child_list.done = 0;

    if (this.added_child_list.name == null)
    {
        $('#newChildTextBox').tooltip('show'); 
        //Hide tooltip after 2 seconds
        $('#newChildTextBox').on('shown.bs.tooltip', function () {
          setTimeout(function(){
            $('#newChildTextBox').tooltip('hide');
        }, 2000);
        })
        return;
    }


    this.listsService.addChildList(this.added_child_list).subscribe(data =>{
      if(data.success){
        console.log(data.payload);
      
        this.pending_lists.push(data.payload);
        this.parent_list.children_list_counter = this.parent_list.children_list_counter + 1;

        //keep this as the last line of code, to clear the textbox and the object
        this.added_child_list = new List();
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
      this.child_lists.forEach(list =>{
        if (list.done == 0){ 
          this.pending_lists.push(list); 
        }
        else{  
          this.completed_lists.push(list);
        }
      })
    },
    err => {
      console.log(err);
      return false;
    });
  }

  editListName(list, event){
    console.log("test");
    if (list.name == "")
    {
       
        $('#'+event.target.id).tooltip('show'); 
        //Hide tooltip after 2 seconds
        $('#'+event.target.id).on('shown.bs.tooltip', function () {
          setTimeout(function(){
            $('#'+event.target.id).tooltip('hide');
        }, 2000);
        })
        return;
    }
    this.listsService.editListName(list).subscribe(data =>{
      if(data.success){
        console.log(data.payload);
      }
      else{
        console.log("Something wrong happened");
      }
      
  })
}


  deleteChildList(list, status_flag){
    this.listsService.removeList(list).subscribe(date =>{
      if(date.success){
        //change size of the parent list to reflect it on the front-end. Ignore the error shown below
        this.parent_list.children_list_counter = this.parent_list.children_list_counter - 1; 

        //checks if the request is coming from the pending or the completed tabs
        if (status_flag == 0){
          this.pending_lists.splice(this.pending_lists.indexOf(list),1);
        }
        else{
          this.completed_lists.splice(this.completed_lists.indexOf(list),1);
        }
        console.log("Deleted list successfully");
        
      }
      else{
        console.log("Failure in Deleting");
      }
    })
  }

  removeParentList(List){
    this.listsService.removeList(List).subscribe(data =>{
      if(data.success){
        this.parent_lists.splice(this.parent_lists.indexOf(List), 1);

        //hide all modals after the action of deleting the parent element is completed
        $('.modal').modal('hide');
      }
      else{
        console.log("failure in deleting parent list");
      }
    })
  }


  switchDone(list){
    this.listsService.switchDone(list).subscribe(date =>{
      if (date.success){
        this.pending_lists.splice(this.pending_lists.indexOf(list),1);
        this.completed_lists.push(list);
      }
      else{
        console.log('error in switching to completed');
      }
    })
  }
  
}
