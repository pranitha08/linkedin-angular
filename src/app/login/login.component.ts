import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../services/registration.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    id: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  constructor(private registrationService : RegistrationService,private router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    const request = this.loginForm.getRawValue();
    this.registrationService.loginUserfromRemote(request).subscribe(data=>{
      alert("Successfully User is logged in")
      console.log(data);
      this.router.navigateByUrl(`welcome/${data.id}`)

    },error=>{
      alert("Sorry User not logged in")
    });
  }

  gotoRegistration(){
    this.router.navigate(["/registration"])
  }
}
