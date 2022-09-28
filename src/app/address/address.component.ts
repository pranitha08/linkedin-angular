import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../address";
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

  address:Address=new Address();
  userid:number;
  address_id:number;

  constructor(
    private _service : AddressService,
    private _router : Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid=this._route.snapshot.params['id'];
    this.address_id=this._route.snapshot.params['id2'];
    if(this.address_id!=0){
      this._service.getAddress(this.userid).subscribe(data => {
          this.addressForm.patchValue(data);
          console.log(data);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onSubmit(){
    console.log(this.address_id);
    const request = this.addressForm.getRawValue();
    console.log(request);
    if(this.address_id==0){
      this._service.addAddress(this.userid,request).subscribe(data => {
          console.log(data);
          this._router.navigateByUrl(`login`);
        }, error => {
          alert("Registration Failed");
        }
      );
    }
    else{
      this._service.putAddress(this.address_id, request).subscribe(data2 => {
          console.log(data2);
          this._router.navigateByUrl(`welcome/${this.userid}`);
        }, error => {
          alert("Address Failed");
        }
      );
    }
  }
}
