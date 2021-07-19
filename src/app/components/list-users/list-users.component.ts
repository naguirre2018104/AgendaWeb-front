import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: [];
  search = "";
  token;

  constructor(private restUser: RestUserService) { }

  ngOnInit(): void {
    this.token = this.restUser.getToken();
    this.listUsers();
  }

  listUsers(){
    this.restUser.getUsers().subscribe((resp:any)=>{
      if(resp.users){
        this.users = resp.users;
        console.log(this.users);
      }else{
        alert(resp.message);
      }
    })
    error => alert(error.error.message);
  }

}
