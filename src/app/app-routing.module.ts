import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AddressComponent} from "./address/address.component";
import {HomeComponent} from "./home/home.component";
import {EditprofileComponent} from "./edit/editprofile/editprofile.component";
import {EducationComponent} from "./education/education.component";
import {ExperienceComponent} from "./experience/experience.component";
import {SkillsComponent} from "./skills/skills.component";

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'profile/:id',component:ProfileComponent},
  {path: 'registration',component:RegistrationComponent},
  {path: 'login',component:LoginComponent},
  {path: 'welcome/:id',component:HomeComponent},
  {path: 'edit/:id',component: EditprofileComponent},
  {path: 'address/:id/:id2',component: AddressComponent},
  {path: 'education/:id/:id2',component:EducationComponent},
  {path: 'experience/:id/:id2',component:ExperienceComponent},
  {path: 'skill/:id',component:SkillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
