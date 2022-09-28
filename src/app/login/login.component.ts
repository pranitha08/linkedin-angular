import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../services/registration.service";
import {Router} from "@angular/router";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=new User();
  msg='';
  constructor(private _service : RegistrationService,private _router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUserfromRemote(this.user).subscribe(data=>{
      alert("Successfully User is logged in")
      console.log(data);
      this._router.navigateByUrl(`welcome/${data.id}`)

    },error=>{
      alert("Sorry User not logged in")
      this.msg="Bad Credentials, please enter valid mail and password";
    });
  }

  gotoRegistration(){
    this._router.navigate(["/registration"])
  }
}
