import { Component, OnInit } from '@angular/core';
import {Office} from '../../models/office';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-offices-search',
  templateUrl: './offices-search.component.html',
  styleUrls: ['./offices-search.component.css']
})
export class OfficesSearchComponent implements OnInit {

  constructor(private httpDataService: HttpDataService, private router: Router, private route: ActivatedRoute) { }
  offices: Array<Office>;
  ngOnInit(): void {
    this.httpDataService.getListOffice()
      .subscribe((response) => {
        this.offices = response;
      });
  }
}
