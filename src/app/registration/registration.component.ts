import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../services/registration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = new FormGroup({
    id: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    cpassword:new FormControl('',Validators.required)
  })

  userid:number;
  constructor(
    private registrationService : RegistrationService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  registerUser() {
    const request = this.registrationForm.getRawValue();
    if(request.email==null || request.password==null || request.cpassword==null){
      alert("please Fill all the fields");
    }
    else if(request.password==request.cpassword) {
      this.registrationService.registerUserFromRemote(request).subscribe(data => {
        alert("Successfully User is registerd you can add details")
        this.router.navigateByUrl(`profile/${data.id}`)
      }, error => alert("Sorry User not register"));
    }
    else{
      alert("password didnt match");
    }
  }

  gotoLogin(){
    this.router.navigate(["/login"])
  }
  ngOnInit(): void {
    this.userid=this.route.snapshot.queryParams['id'];
  }
}
