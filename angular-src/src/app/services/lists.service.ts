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

  prepEndpoint(ep){
    if(!isDevMode()){
      return ep;  
    } else {
      return 'http://localhost:8080/'+ ep;
    }
  }

}
