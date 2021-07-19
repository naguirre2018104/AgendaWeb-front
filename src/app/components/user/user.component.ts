import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { fadeIn } from 'src/app/transitions/transitions';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class UserComponent implements OnInit {

  public message: string;
  public messageRemove: string;
  public user: User;
  public token;
  public confirmPassword;
  public filesImage: Array<File>;
  public messageUpdated: string = '';
  public uri: string;

  constructor(private restUser: RestUserService, private route: Router) { 
    this.confirmPassword = '';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    delete this.user.password;
    delete this.user.role;
    console.log(this.user);
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        localStorage.setItem("user", JSON.stringify(res.userUpdated));
        this.message = res.message;
      }
      this.message = res.message;
    },
    error => this.message = error.error.message)
  }

  removeUser(){
    //console.log(this.confirmPassword);
    this.restUser.removeUser(this.user._id,this.confirmPassword).subscribe((res:any)=>{
      if(res.userRemoved){
        localStorage.clear();
        this.route.navigateByUrl("/home");
      }
      alert(res.message);
    },
    error => alert(error.error.message))
  }

  uploadImage(){
    this.restUser.saveFile(this.user._id,[],this.filesImage,this.token,"image").then((res: any)=>{
      if(res.user){
        this.user.image = res.userImage;
        this.messageUpdated = "Image loaded successfully";
        localStorage.setItem("user",JSON.stringify(this.user));
      }else{
        this.messageUpdated = res.message;
      }
    })
  }

  fileChange(fileInput){
    this.filesImage = <Array<File>>fileInput.target.files;
    console.log(this.filesImage);
  }

}
