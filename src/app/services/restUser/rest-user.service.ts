import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {

  public user;
  public token;

  public uri: string;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  testService(){
    return "Funcionando desde restUserService";
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user != undefined || user != null){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  getToken(){
    let token = localStorage.getItem("token");
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  saveUser(user){
    console.log(user);
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'saveUser', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  login(user, token){
    user.gettoken = token;
    console.log(user);
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  updateUser(user){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri + "updateUser/" + user._id, params, {headers: headers})
    .pipe(map(this.extractData));
  }

  removeUser(user, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri + "removeUser/" + user, {password: password}, {headers: headers})
    .pipe(map(this.extractData));
  }

  saveFile(userId: String, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve,reject)=>{
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri + userId + "/uploadImage";

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){ // Es 4 porque tiene 5 estados y el estado 4 es cuando finaliza y la respuesta está lista. 
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.open("PUT",uri,true); // El último true es para afirmar que sea asíncrona.
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    })
  }

  saveUserByAdmin(user, adminId){
    let params = JSON.stringify(user);
    return this.http.post(this.uri + "saveUserOnlyAdmin/" + adminId, params, this.httpOptionsAuth)
    .pipe(map(this.extractData));
  }

  getUsers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri + "getUsers", {headers: headers})
    .pipe(map(this.extractData));
  }

}
