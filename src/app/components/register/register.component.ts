import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { User } from '../../models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn]
})
export class RegisterComponent implements OnInit {

  public user:User;
  public message;
  public username;

  constructor(private restUser:RestUserService) {
    this.user = new User('','','','','','','','','ROLE_USER',[]);
  }

  ngOnInit(): void {
  }

  onSubmit(register){
    this.restUser.saveUser(this.user).subscribe((res:any)=>{
      if(res.userSaved){
        this.username = res.userSaved.username;
        register.reset();
      }
      this.message = res.message;
    })

    error => console.log(<any>error);
  }

}
