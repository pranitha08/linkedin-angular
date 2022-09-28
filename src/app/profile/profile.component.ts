import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../services/profile.service";
import {Details} from "../details";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Details=new Details();
  @Input() userid:number;

  constructor(
    private _service : ProfileService,
    private _router : Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid=this._route.snapshot.params['id'];
  }

  onSubmit(){
    if(this.user.first_name==null || this.user.last_name==null){
      alert("please Fill all the fields");
    }
    console.log(this.user);
    console.log(this.userid);
    this._service.addProfile(this.userid,this.user).subscribe(data => {
      console.log(data);
        this._router.navigateByUrl(`address/${data.id}/0`);
      }, error => {
        alert("Registration Failed");
      }
    );
  }

}
