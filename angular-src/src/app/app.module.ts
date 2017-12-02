import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
//import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { FlashMessagesModule } from 'ngx-flash-messages';
//import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MakeHerSleepComponent } from './components/make-her-sleep/make-her-sleep.component';
 
const appRoutes: Routes = [
  {path:'', component : HomeComponent},
  // {path:'register', component : RegisterComponent},
  {path:'home', component : HomeComponent},
  {path:'login', component : LoginComponent},
  // {path:'profile', component : ProfileComponent, canActivate: [AuthGuard]},
  {path:'make-her-sleep', component : MakeHerSleepComponent} //remember to add auth-guard
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    MakeHerSleepComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    //FlashMessagesModule.forRoot()
    FlashMessagesModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
