import {Component, Input, OnInit} from '@angular/core';
import {Details} from "../details";
import {Address} from "../address";
import {ActivatedRoute, Router} from "@angular/router";
import {WelcomedetailsService} from "../services/welcomedetails.service";
import {User} from "../user";
import {Education} from "../education";
import {Experience} from "../experience";
import {EducationService} from "../services/education.service";
import {ExperienceService} from "../services/experience.service";
import {Skills} from "../skills";
import {SkillsService} from "../services/skills.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User=new User();
  details:Details = new Details();
  address:Address = new Address();
  education: Education[] = [];
  experience:Experience[] = [];
  skill: Skills[]=[];
  addressid:number=0;
  @Input() userid!: number;
  neweducation: boolean=false;
  newexperience: boolean=false;
  newskill: boolean=false;
  ngOnInit(): void {
    this.userid = this._route.snapshot.params['id'];
    this.getDetails();
  }

  constructor(
    private _service : WelcomedetailsService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private skillService: SkillsService,
    private _router : Router,
    private _route: ActivatedRoute
  ) { }
  getDetails(){
    this._service.getDetails(this.userid).subscribe(data => {
        console.log(data);
        this.details=data;
        this.address=data.address_id;
        this.addressid=this.address.id;
        this.user=data.login_id;
        if(data.education.length!=0) {
          this.education = data.education;
        }
        else{
          this.neweducation=true;
        }
        if(data.experience.length!=0) {
          this.experience = data.experience;
        }
        else {
          this.newexperience = true;
        }
        if(data.skill.length!=0) {
          this.skill = data.skill;
        }
        else {
          this.newexperience = true;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  edit(id: number){
    this._router.navigateByUrl(`edit/${id}`);
  }

  editAddress(id: number){
    this._router.navigateByUrl(`address/${id}/${this.addressid}`);
  }

  addEducation(){
    this.neweducation=true;
    this._router.navigateByUrl(`education/${this.userid}/0`);
  }

  addExperience(){
    this.newexperience=true;
    this._router.navigateByUrl(`experience/${this.userid}/0`);
  }

  addSkill(){
    this.newskill=true;
    this._router.navigateByUrl(`skill/${this.userid}`);
  }

  deleteEducation(id: number){
    this.educationService.deleteEducation(id).subscribe(data => {
        this.education.pop();
        this._router.navigateByUrl(`welcome/${this.userid}`);
      }
    );
  }

  deleteExperience(id: number){
    this.experienceService.deleteExperience(id).subscribe(data => {
        this.experience.pop();
        this._router.navigateByUrl(`welcome/${this.userid}`);
      }
    );
  }


  deleteSkill(id:number){
    this.skillService.deleteSkill(id).subscribe(data => {
        this.skill.pop();
        this._router.navigateByUrl(`welcome/${this.userid}`);
      }
    );
  }

  editEducation(id:number){
    this._router.navigateByUrl(`education/${this.userid}/${id}`);
  }
  editExperience(id: number){
    this._router.navigateByUrl(`experience/${this.userid}/${id}`);
  }
}
