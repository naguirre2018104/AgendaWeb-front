import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { RestContactService } from 'src/app/services/restContact/rest-contact.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-home-contacts',
  templateUrl: './home-contacts.component.html',
  styleUrls: ['./home-contacts.component.css']
})
export class HomeContactsComponent implements OnInit {

  contacts: [];
  user;
  contact: Contact;

  constructor(private restUser: RestUserService, private restContact: RestContactService) { 
    this.contact = new Contact("","","",null);
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.contacts = this.user.contacts;
    console.log(this.contacts);
  }

  obtenerContacto(contact){
    this.contact = contact;
  }

  updateContact(){
    this.restContact.updateContact(this.user._id,this.contact).subscribe((resp:any)=>{
      if(resp.contactUpdated){
        this.contact = new Contact("","","",null);
        localStorage.setItem("user",JSON.stringify(this.user));
        alert(resp.message);
      }else{
        this.user = this.restUser.getUser();
        this.contacts = this.user.contacts;
        alert(resp.message);
      }
    })
    error => alert(error.error.message);
  }

  removeContact(){
    this.restContact.removeContact(this.user._id,this.contact._id).subscribe((resp:any)=>{
      if(resp.contactPull){
        alert(resp.message);
        this.contact = new Contact("","","",null);
        localStorage.setItem("user",JSON.stringify(resp.contactPull));
        this.user = this.restUser.getUser();
        this.contacts = this.user.contacts;
      }else{
        alert(resp.message);
      }
    })
  }

}
