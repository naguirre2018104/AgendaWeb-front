import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { fadeIn } from '../../transitions/transitions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {

  public user:User;
  public message;
  token: string;
  userLogged;

  constructor(private restUser: RestUserService, private route: Router) { 
    this.user =  new User('','','','','','','','','',[]);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restUser.login(this.user,"true").subscribe((res:any)=>{
      this.userLogged = res.user;
      if(!res.token){
        this.message = res.message;
      }else{
        delete this.userLogged.password;
        this.token = res.token;
        if(this.token.length <= 0){
          this.message = "Error al generar token";
        }else{
          //console.log(this.token);
          //console.log(res.user);
          localStorage.setItem("token",this.token);
          localStorage.setItem("user",JSON.stringify(this.userLogged));
          /* localStorage.setItem("role",this.userLogged.role);
          localStorage.setItem("username",this.userLogged.username); */
          this.message = "Usuario logeado";
          this.route.navigateByUrl('homeContacts');
        }
      }
    },
    (error:any) => this.message = error.error.message
    /* error => {
      var error = <any>error;
      let body = JSON.parse(error._body);
      console.log(error._body);
      this.message = body;
    }; */
    )
  }

}
