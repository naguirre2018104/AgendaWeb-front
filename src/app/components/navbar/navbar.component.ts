import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  token: string;
  user: any;
  uri;

  constructor(private route: Router, private restUser: RestUserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uri = CONNECTION.URI;
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  eliminarData(){
    localStorage.clear(); // Elimina todo.
    // localStorage.removeItem("username"); // Elimina solamente un item.
  }

  logOut(){
    localStorage.clear();
    this.route.navigateByUrl("home");
  }

}
