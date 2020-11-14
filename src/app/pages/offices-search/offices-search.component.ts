import { Component, OnInit } from '@angular/core';
import {Office} from '../../models/office';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-offices-search',
  templateUrl: './offices-search.component.html',
  styleUrls: ['./offices-search.component.css']
})
export class OfficesSearchComponent implements OnInit {

  constructor(private httpDataService: HttpDataService, private router: Router, private route: ActivatedRoute) { }
/*  offices: Array<Office>;*/
  dataSource = new MatTableDataSource( );
  ngOnInit(): void {
    this.httpDataService.getListOffice()
      .subscribe((response) => {
        this.dataSource.data = response;
      });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
