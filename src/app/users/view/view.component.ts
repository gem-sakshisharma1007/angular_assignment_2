import { Component } from '@angular/core';
import { UsersDataService } from 'src/app/users-data.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private userservice: UsersDataService){
    if(this.userservice.details !== undefined)
    this.viewDetails = this.userservice.addData();
    console.log(this.viewDetails)
  }
  viewDetails:any;
  


  

  
}

