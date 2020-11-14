import { Component, OnInit } from '@angular/core';
import {HttpDataOfficeService} from '../../services/http-data-office.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Office} from '../../models/office';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail-office',
  templateUrl: './detail-office.component.html',
  styleUrls: ['./detail-office.component.css']
})
export class DetailOfficeComponent implements OnInit {
  officeId: number;
  officeData: Office = new Office();
  constructor(private httpDataOfficeService: HttpDataOfficeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*this.officeId = Number(this.route.params.subscribe( params => {
      return 0;
    }));*/
  }

  retrieveOffice(id): void {
    this.httpDataOfficeService.getOffice(id)
      .subscribe((response: Office) => {
        this.officeData = {} as Office;
        this.officeData = _.cloneDeep(response);
        console.log(response);
        console.log(this.officeData);
      });
  }
}
