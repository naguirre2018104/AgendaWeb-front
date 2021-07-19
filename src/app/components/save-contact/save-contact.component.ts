import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { RestContactService } from 'src/app/services/restContact/rest-contact.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-save-contact',
  templateUrl: './save-contact.component.html',
  styleUrls: ['./save-contact.component.css']
})
export class SaveContactComponent implements OnInit {

  public contact: Contact;
  public user: User;
  public token;
  message: string = '';

  constructor(private restContact: RestContactService, private restUser: RestUserService) { 
    this.contact = new Contact("","","",null);
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
  }

  onSubmit(contactForm){
    this.restContact.saveContact(this.user._id,this.contact).subscribe((resp:any)=>{
      if(resp.contactPush){
        contactForm.reset();
        console.log(resp.contactPush);
        delete resp.contactPush.password;
        this.user = resp.contactPush;
        localStorage.setItem("user",JSON.stringify(this.user));
        alert(resp.message);
      }
      this.message = resp.message;
    })
  }

  closeAlert(){
    this.message = '';
  }

}
