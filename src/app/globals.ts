import { Injectable } from "@angular/core";

@Injectable()

export class Globals{

    loggedIn:boolean=false;

    Globals(){
        this.loggedIn = false;
    }

    setData(n:boolean){
        this.loggedIn = n;
    }

    getData():boolean{
        return this.loggedIn;
    }
}


export var globals = new Globals();
export var api = new Globals();


