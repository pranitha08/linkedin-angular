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
import {SkillService} from "../services/skill.service";


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
  addressId:number=0;
  @Input() userid!: number;
  ngOnInit(): void {
    this.userid = this.route.snapshot.params['id'];
    this.getDetails();
  }

  constructor(
    private welcomeDetailsService : WelcomedetailsService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private skillService: SkillService,
    private router : Router,
    private route: ActivatedRoute
  ) { }
  getDetails(){
    this.welcomeDetailsService.getDetails(this.userid).subscribe(data => {
        console.log(data);
        this.details=data;
        this.address=data.address_id;
        this.addressId=this.address.id;
        this.user=data.login_id;
        this.education = data.education;
        this.experience = data.experience;
        this.skill = data.skill;
      }, error => {
        console.log(error);
      }
    );
  }

  edit(id: number){
    this.router.navigateByUrl(`edit/${id}`);
  }

  editAddress(id: number){
    this.router.navigateByUrl(`address/${id}/${this.addressId}`);
  }

  addEducation(){
    this.router.navigateByUrl(`education/${this.userid}/0`);
  }

  addExperience(){
    this.router.navigateByUrl(`experience/${this.userid}/0`);
  }

  addSkill(){
    this.router.navigateByUrl(`skill/${this.userid}`);
  }

  deleteEducation(id: number){
    this.educationService.deleteEducation(id).subscribe(data => {
        this.education.pop();
        this.router.navigateByUrl(`welcome/${this.userid}`);
      }
    );
  }

  deleteExperience(id: number){
    this.experienceService.deleteExperience(id).subscribe(data => {
        this.experience.pop();
        this.router.navigateByUrl(`welcome/${this.userid}`);
      }
    );
  }


  deleteSkill(id:number){
    this.skillService.deleteSkill(id).subscribe(data => {
        this.skill.pop();
        this.router.navigateByUrl(`welcome/${this.userid}`);
      }
    );
  }

  editEducation(id:number){
    this.router.navigateByUrl(`education/${this.userid}/${id}`);
  }
  editExperience(id: number){
    this.router.navigateByUrl(`experience/${this.userid}/${id}`);
  }
}
