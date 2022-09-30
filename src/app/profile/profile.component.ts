import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../services/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    id: new FormControl('', Validators.required),
    first_name: new FormControl('',Validators.required),
    last_name: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    contact_no: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  })
  userid:number;

  constructor(
    private profileService : ProfileService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid=this.route.snapshot.params['id'];
  }

  onSubmit(){
    const request = this.profileForm.getRawValue();
    if(request.first_name==null || request.last_name==null){
      alert("please Fill all the fields");
    }
    this.profileService.addProfile(this.userid,request).subscribe(data => {
        this.router.navigateByUrl(`address/${data.id}/0`);
      }, error => {
        alert("Couldn't Add the details");
      }
    );
  }
}
