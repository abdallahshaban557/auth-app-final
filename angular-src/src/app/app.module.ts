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
import { ListsService } from './services/lists.service';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MakeHerSleepComponent } from './components/make-her-sleep/make-her-sleep.component';
import { MusicComponent } from './components/music/music.component';
import { ParentListsComponent } from './components/parent-lists/parent-lists.component';
 
const appRoutes: Routes = [
  {path:'', component : HomeComponent, canActivate: [AuthGuard]},
  // {path:'register', component : RegisterComponent},
  {path:'home', component : HomeComponent ,canActivate: [AuthGuard]},
  {path:'login', component : LoginComponent},
  // {path:'profile', component : ProfileComponent, canActivate: [AuthGuard]},
  {path:'make-her-sleep', component : MakeHerSleepComponent,canActivate: [AuthGuard]},
  {path:'music', component : MusicComponent,canActivate: [AuthGuard]},
  {path:'main_lists', component : ParentListsComponent,canActivate: [AuthGuard]} 
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    MakeHerSleepComponent,
    MusicComponent,
    ParentListsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FlashMessagesModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, AuthGuard, ListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
