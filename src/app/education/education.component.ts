import {Component, Input, OnInit} from '@angular/core';
import {Education} from "../education";
import {ActivatedRoute, Router} from "@angular/router";
import {EducationService} from "../services/education.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educationForm = new FormGroup({
    id: new FormControl('', Validators.required),
    school: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    degree: new FormControl('',Validators.required),
    field: new FormControl('',Validators.required),
    grade: new FormControl('',Validators.required),
    start_date: new FormControl('',Validators.required),
    end_date: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  })

  userid:number;
  eduid:number;

  constructor(
    private _service : EducationService,
    private _router : Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid=this._route.snapshot.params['id'];
    this.eduid=this._route.snapshot.params['id2'];
    if(this.eduid != 0) {
      this._service.getEducation(this.eduid).subscribe(data => {
        this.educationForm.patchValue(data);
        console.log(data);
      });
    }
  }

  onSubmit(){
    const request = this.educationForm.getRawValue();
    if(this.eduid==0){
      this._service.addEducation(this.userid,request).subscribe(data => {
          console.log(data);
          console.log(this.userid);
          this._router.navigateByUrl(`welcome/${this.userid}`);
        }, error => {
          alert("Registration Failed");
        }
      );
    }
    else{
      this._service.editEducation(this.eduid,request).subscribe(data => {
        this._router.navigateByUrl(`welcome/${this.userid}`);
      }, error => {
        alert("Failed");
      });
    }
  }
}
