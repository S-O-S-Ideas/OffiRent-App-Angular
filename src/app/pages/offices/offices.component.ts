import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Office } from '../../models/office';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit, AfterViewInit {
  @ViewChild('officeForm', { static: false })
  officeForm: NgForm;
  officeData: Office;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'address', 'floor', 'capacity', 'description', 'price', 'comment'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataService, private router: Router) {
    this.officeData = {} as Office;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllOffices();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllOffices(): void {
    this.httpDataService.getListOffice().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  editItem(element): void {
    console.log(element);
    this.officeData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.officeForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Office) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addOffice(): void {
    const newOffice = {address: this.officeData.address, floor: this.officeData.floor,
      capacity: this.officeData.capacity, description: this.officeData.description,
      price: this.officeData.price, comment: this.officeData.comment};
    this.httpDataService.createItem(newOffice).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateOffice(): void {
    this.httpDataService.updateItem(this.officeData.id, this.officeData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Office) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.officeForm.form.valid) {
      if (this.isEditMode) {
        this.updateOffice();
      } else {
        this.addOffice();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddOffice(): void {
    this.router.navigate(['/my-offices/new']).then(() => null);
  }
  navigateToEditStudent(officeId): void {
    this.router.navigate([`/my-offices/${officeId}`]).then(() => null);
  }
}
