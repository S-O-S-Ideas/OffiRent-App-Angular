import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Reservation} from '../../models/reservation';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit, AfterViewInit {
  @ViewChild('reservationForm', { static: false })
  reservationForm: NgForm;
  reservationData: Reservation;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'status', 'initialDate', 'endDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataService, private router: Router) {
    this.reservationData = {} as Reservation;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllReservations();
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
  getAllReservations(): void {
    this.httpDataService.getListOfReservations(1).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.reservationForm.resetForm();
  }
  addReservation(): void {
    const newReservation = { status: this.reservationData.status, initialDate: this.reservationData.initialDate,
      endDate: this.reservationData.endDate, OfficeId: this.reservationData.officeId, AccountId: this.reservationData.accountId };
    this.httpDataService.createReservation(newReservation).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }

  onSubmit(): void {
    if (this.reservationForm.form.valid) {
      this.addReservation();
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToAddReservation(): void {
    this.router.navigate(['/my-reservations/new']).then(() => null);
  }
  navigateToEditReservation(reservationId): void {
    this.router.navigate([`/my-reservations/${reservationId}`]).then(() => null);
  }
}
