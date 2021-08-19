import { Component, OnInit } from '@angular/core';
import { GetCardResponseModel } from 'src/app/models/GetCardResponseModel';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as myGlobals from '../../globals';
import {ActivatedRoute} from '@angular/router'
import { query } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkInput:boolean=true
  cardNo:string=""
  model: GetCardResponseModel = new GetCardResponseModel
  showSpinner=false
  constructor(private service: ApiserviceService, private _snackBar: MatSnackBar,private route:ActivatedRoute) { }

  ngOnInit():void {
    // if(this.cardNo){
    //   this.checkInput=false
    // }else{
    //   this.checkInput=true
    // }
    this.route.queryParams.subscribe(
      params => {
        if(params && params["cardNo"]){
          console.log("giray")
          this.getCard(params.cardNo)
        }
      }
    )
    // this.route.params.subscribe(
    //   params => this.cardNo=params.cardNo
    // );
    // if(this.cardNo) this.getCard(this.cardNo)
  }

  getLoggedIn(): boolean {
    return myGlobals.globals.getData();
  }

  getLoggedInReverse(): boolean {
    return !myGlobals.globals.getData();

  }

  getCard(cardNo: string) {
    this.showSpinner=true

    if(cardNo!=null){
      var request = {
        "Action": "Execute",
        "Object": "SP_POS_FINDENTRYCARD",
        "Parameters": {
          "HOTELID": 20854,
          "CARDNO": cardNo
        }
      };
  
      this.service.findCard(request).subscribe(model => {
        this.model = model[0][0]
        if (this.model && this.model.CARDNO==cardNo) {
          myGlobals.globals.setData(true);
        }else {
          
          this._snackBar.open(cardNo + ' kayıtlı değildir', 'Tamam', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        
      })

    }
    
    this.showSpinner=false
  }


}