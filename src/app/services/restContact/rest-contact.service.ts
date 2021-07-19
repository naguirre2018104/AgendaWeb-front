import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestContactService {

  public user;
  public token;
  public uri: string;

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private restUser: RestUserService, private http: HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  saveContact(userId, contact){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.restUser.getToken()
      });
    let params = JSON.stringify(contact);
    return this.http.put(this.uri + "setContact/" + userId, params, {headers: headers})
    .pipe(map(this.extractData));
  }

  updateContact(userId, contact){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    });
    let params = JSON.stringify(contact);
    return this.http.put(this.uri + userId + "/updateContact/" + contact._id, params, {headers: headers})
    .pipe(map(this.extractData));
  }

  removeContact(userId, contactId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    });
    return this.http.put(this.uri + userId + "/removeContact/" + contactId, [], {headers: headers})
    .pipe(map(this.extractData));
  }
}
