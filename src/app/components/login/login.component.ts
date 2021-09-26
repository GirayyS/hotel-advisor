import { Component, OnInit } from '@angular/core';
import { GetCardResponseModel } from 'src/app/models/GetCardResponseModel';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as myGlobals from '../../globals';
import {ActivatedRoute, Router} from '@angular/router'
import { query } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cardNo:string=""
  model: GetCardResponseModel = new GetCardResponseModel
  showSpinner=false
  constructor(private service: ApiserviceService, private _snackBar: MatSnackBar,private route:ActivatedRoute,private router:Router) { }

  ngOnInit():void {
    this.route.queryParams.subscribe(
      params => {
        if(params && params["cardNo"]){
          this.getCard(params.cardNo)
        }
      }
    )

  }

  getLoggedIn(): boolean {
    return myGlobals.globals.getData();
  }

  getLoggedInReverse(): boolean {
    return !myGlobals.globals.getData();

  }

  getCard(cardNo?: string) {
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
            duration:3000
          });
        }
        
      })

    }
    this.router.navigate([''],{queryParams:{cardNo:cardNo}})
    this.showSpinner=false
  }


}