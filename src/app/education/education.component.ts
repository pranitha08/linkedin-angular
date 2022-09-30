import {Component, Input, OnInit} from '@angular/core';
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

  userId:number;
  eduId:number;

  constructor(
    private educationService : EducationService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['id'];
    this.eduId=this.route.snapshot.params['id2'];
    if(this.eduId != 0) {
      this.educationService.getEducation(this.eduId).subscribe(data => {
        this.educationForm.patchValue(data);
      });
    }
  }

  onSubmit(){
    const request = this.educationForm.getRawValue();
    if(this.eduId==0){
      this.educationService.addEducation(this.userId,request).subscribe(data => {
          this.router.navigateByUrl(`welcome/${this.userId}`);
        }, error => {
          alert("Couldn't Add the details");
        }
      );
    }
    else{
      this.educationService.editEducation(this.eduId,request).subscribe(data => {
        this.router.navigateByUrl(`welcome/${this.userId}`);
      }, error => {
        alert("Couldn't Add the details");
      });
    }
  }
}
