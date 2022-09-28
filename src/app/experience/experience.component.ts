import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Experience} from "../experience";
import {ExperienceService} from "../services/experience.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experienceForm = new FormGroup({
    id: new FormControl('', Validators.required),
    company_name: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    position: new FormControl('',Validators.required),
    start_date: new FormControl('',Validators.required),
    end_date: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  })
  experience:Experience=new Experience();
  userid:number;
  expid:number;

  constructor(
    private _service : ExperienceService,
    private _router : Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid = this._route.snapshot.params['id'];
    this.expid = this._route.snapshot.params['id2'];
    if (this.expid != 0) {
      this._service.getExperience(this.expid).subscribe(data => {
        this.experienceForm.patchValue(data);
        console.log(data);
      });
    }
  }

  onSubmit(){
    const request = this.experienceForm.getRawValue();
    if(this.expid==0){
      this._service.addExperience(this.userid,request).subscribe(data => {
          console.log(data);
          console.log(this.userid);
          this._router.navigateByUrl(`welcome/${this.userid}`);
        }, error => {
          alert("Registration Failed");
        }
      );
    }
    else{
      this._service.editExperience(this.expid,request).subscribe(data => {
        this._router.navigateByUrl(`welcome/${this.userid}`);
      }, error => {
        alert("Failed");
      });
    }

  }

}
