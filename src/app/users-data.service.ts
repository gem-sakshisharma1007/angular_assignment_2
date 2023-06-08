import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  details:any
  finalData:any = [];

  addData(){
    this.finalData.push(this.details);
    return this.finalData;
  }

  constructor() { }
}
