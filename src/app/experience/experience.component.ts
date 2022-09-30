import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  userId:number;
  expId:number;

  constructor(
    private experienceService : ExperienceService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.expId = this.route.snapshot.params['id2'];
    if (this.expId != 0) {
      this.experienceService.getExperience(this.expId).subscribe(data => {
        this.experienceForm.patchValue(data);
      });
    }
  }

  onSubmit(){
    const request = this.experienceForm.getRawValue();
    if(this.expId==0){
      this.experienceService.addExperience(this.userId,request).subscribe(data => {
          this.router.navigateByUrl(`welcome/${this.userId}`);
        }, error => {
          alert("Couldn't add the details");
        }
      );
    }
    else{
      this.experienceService.editExperience(this.expId,request).subscribe(data => {
        this.router.navigateByUrl(`welcome/${this.userId}`);
      }, error => {
        alert("Couldn't Add the details");
      });
    }
  }
}
