import { Injectable, isDevMode } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class ListsService {
  Lists: any;
  token = localStorage.getItem('id_token');

  constructor(private http:Http) { }
  
  getParentLists(){  
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/getallParentLists');
    return this.http.get(ep ,{headers: headers})
      .map(res => res.json());
  }

  addParentList(list){
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/addParentList')
    return this.http.post(ep, list, {headers: headers})
      .map(res => res.json());
  }

  addChildList(list){
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/addChildList')
    return this.http.post(ep, list, {headers: headers})
      .map(res => res.json());
  }

  getChildLists(parent_id){
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/getallChildLists/'+parent_id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }



  editListName(Child_List){
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/editListName');
    return this.http.put(ep, Child_List, {headers: headers})
      .map(res => res.json());
  }


  switchDone(Child_List){
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/switchDone');
    return this.http.put(ep, Child_List, {headers: headers})
      .map(res => res.json());
  }

  removeList(List){
    let headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('lists/removeList/'+List._id);
    return this.http.delete(ep, {headers: headers})
      .map(res => res.json());
  }



  prepEndpoint(ep){
    if(!isDevMode()){
      return ep;  
    } else {
      return 'http://localhost:8080/'+ ep;
    }
  }

}
