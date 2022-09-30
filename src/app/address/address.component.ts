import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../services/address.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm = new FormGroup({
    id: new FormControl('', Validators.required),
    street: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    pin_code: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required)
  })

  userid:number;
  address_id:number;

  constructor(
    private addressService : AddressService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid=this.route.snapshot.params['id'];
    this.address_id=this.route.snapshot.params['id2'];
    if(this.address_id!=0){
      this.addressService.getAddress(this.userid).subscribe(data => {
          this.addressForm.patchValue(data);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onSubmit(){
    const request = this.addressForm.getRawValue();
    if(this.address_id==0){
      this.addressService.addAddress(this.userid,request).subscribe(data => {
          this.router.navigateByUrl(`login`);
        }, error => {
          alert("Adding address Failed");
        }
      );
    }
    else{
      this.addressService.putAddress(this.address_id, request).subscribe(data2 => {
          this.router.navigateByUrl(`welcome/${this.userid}`);
        }, error => {
          alert("Adding address Failed");
        }
      );
    }
  }
}
