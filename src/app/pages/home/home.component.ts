import { Component, OnInit } from '@angular/core';
import {Office} from '../../models/office';
import {HttpDataService} from '../../services/http-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offices: Array<Office>;
  constructor(private httpDataService: HttpDataService) { }
  ngOnInit(): void {
   this.httpDataService.getListOffice()
      .subscribe((response) => {
        this.offices = response;
      });
  }

}
