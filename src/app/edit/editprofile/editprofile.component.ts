import {Component, Input, OnInit} from '@angular/core';
import {WelcomedetailsService} from "../../services/welcomedetails.service";
import {ActivatedRoute,Router} from "@angular/router";
import {Details} from "../../details";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  profileForm = new FormGroup({
    id: new FormControl('', Validators.required),
    first_name: new FormControl('',Validators.required),
    last_name: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    contact_no: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  })

  user:Details = new Details();
  userid!: number;
  constructor(
    private _service: WelcomedetailsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.userid=this._route.snapshot.params['id'];
    this._service.getDetails(this.userid).subscribe(data => {
        // this.user= data;
      this.profileForm.patchValue(data);
      }, error => {
        console.log(error);
      }
    );
  }


  editUser(id: number) {
    const request = this.profileForm.getRawValue();
    this._service.putDetails(id, request).subscribe(data => {
        // this.user = data;
      this._router.navigateByUrl(`welcome/${id}`);
      }
    );
  }

}
