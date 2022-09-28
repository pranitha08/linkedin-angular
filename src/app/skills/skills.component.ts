import {Component, Input, OnInit} from '@angular/core';
import {Education} from "../education";
import {EducationService} from "../services/education.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Skills} from "../skills";
import {SkillsService} from "../services/skills.service";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skill:Skills=new Skills();
  @Input() userid:number;

  constructor(
    private _service : SkillsService,
    private _router : Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid=this._route.snapshot.params['id'];
  }

  onSubmit(){
    // console.log(this.education);
    // console.log(this.userid);
    this._service.addSkills(this.userid,this.skill).subscribe(data => {
        console.log(data);
        console.log(this.userid);
        this._router.navigateByUrl(`welcome/${this.userid}`);
      }, error => {
        alert("Registration Failed");
      }
    );
  }

}
