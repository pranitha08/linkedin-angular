import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../services/skill.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skillForm = new FormGroup({
    id: new FormControl('', Validators.required),
    skill_name: new FormControl('',Validators.required)
  })
  userId:number;

  constructor(
    private skillService : SkillService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['id'];
  }

  onSubmit(){
    const request = this.skillForm.getRawValue();
    this.skillService.addSkills(this.userId,request).subscribe(data => {
        this.router.navigateByUrl(`welcome/${this.userId}`);
      }, error => {
        alert("Registration Failed");
      }
    );
  }

}
