import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {RegistrationService} from "../services/registration.service";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user=new User();

  constructor(
    private _service : RegistrationService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }

  // @ts-ignore
  registerUser() {
    if(this.user.email==null || this.user.password==null || this.user.cpassword==null){
      alert("please Fill all the fields");
    }
    else if(this.user.password==this.user.cpassword) {
      this._service.registerUserFromRemote(this.user).subscribe(data => {
        alert("Successfully User is registerd you can add details")
        console.log(data);
        this._router.navigateByUrl(`profile/${data.id}`)
      }, error => alert("Sorry User not register"));
    }
    else{
      alert("password didnt match");
    }
  }

  gotoLogin(){
    this._router.navigate(["/login"])
  }
  ngOnInit(): void {
    this.user.userid=this._route.snapshot.queryParams['id'];
  }
}
