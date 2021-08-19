import { Component, OnInit,Input,NgModule} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCardResponseModel } from 'src/app/models/GetCardResponseModel';
import { GetExtraModel } from 'src/app/models/GetCardDetails';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() model: GetCardResponseModel = new GetCardResponseModel;
  
  model2: Array<GetExtraModel> = [];

  constructor(private route: ActivatedRoute, private service: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  step = 0;
  qr =0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getCardDetails() {

    var request = {
      "Action": "Execute",
      "Object": "SP_POS_SHOWFOLIO_ENTRYCARD",
      "Parameters": {
        "RESNAMEID": this.model.RESNAMEID
      }
    };
    this.service.findCardDetails(request).subscribe(model2 => {
      this.model2 = model2[0];
    })
  }
  getTotalCost() {
    return this.model2.map(t => t.TOTAL).reduce((acc, value) => acc + value, 0);
  }

  isShow(){
    this.router.navigate([''])
    myGlobals.globals.setData(false);
    window.location.reload();
  }

  getLoggedIn():boolean{
    return myGlobals.globals.getData();
  }
}
