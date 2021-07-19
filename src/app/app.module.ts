import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadreComponent } from './components/padre/padre.component';
import { HijoComponent } from './components/hijo/hijo.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';

import { RestUserService } from './services/restUser/rest-user.service';
import { SaveContactComponent } from './components/save-contact/save-contact.component';
import { HomeContactsComponent } from './components/home-contacts/home-contacts.component';
import { UserComponent } from './components/user/user.component';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SearchPipe } from './pipes/search.pipe';
import { RestContactService } from './services/restContact/rest-contact.service';

@NgModule({
  declarations: [
    AppComponent,
    PadreComponent,
    HijoComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    NotFoundComponent,
    LoginComponent,
    SaveContactComponent,
    HomeContactsComponent,
    UserComponent,
    SaveUserComponent,
    ListUsersComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    RestUserService,
    RestContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
