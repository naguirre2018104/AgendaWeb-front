import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {

  public user: User;
  public roleOptions = ["ROLE_ADMIN","ROLE_USER"];
  public userLogged;
  message: string = '';
  token;

  constructor(private restUser: RestUserService) { 
    this.userLogged = this.restUser.getUser();
    this.token = this.restUser.getToken();
  }

  ngOnInit(): void {
    this.user = new User("","","","","","","","","",[]);
  }

  onSubmit(statusForm){
    this.restUser.saveUserByAdmin(this.user, this.userLogged._id).subscribe((resp: any)=>{
      if(resp.userSaved){
        this.message = "Usuario creado exitosamente";
        this.user = new User("","","","","","","","","",[]);
        statusForm.reset();
      }else{
        this.message = resp.message;
      }
    })
    error => console.log(<any>error);
  }

}
