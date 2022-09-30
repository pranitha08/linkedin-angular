import {Component, OnInit} from '@angular/core';
import {WelcomedetailsService} from "../services/welcomedetails.service";
import {ActivatedRoute,Router} from "@angular/router";
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

  userid!: number;
  constructor(
    private welcomeDetailsService: WelcomedetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userid=this.route.snapshot.params['id'];
    this.welcomeDetailsService.getDetails(this.userid).subscribe(data => {
      this.profileForm.patchValue(data);
      }, error => {
        console.log(error);
      }
    );
  }


  editUser(id: number) {
    const request = this.profileForm.getRawValue();
    this.welcomeDetailsService.putDetails(id, request).subscribe(data => {
      this.router.navigateByUrl(`welcome/${id}`);
      }
    );
  }

}
