import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';
import {Reservation} from '../../models/reservation';
import {HttpDataService} from '../../services/http-data.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @ViewChild('reservationForm', {static: false})
  reservationForm: NgForm;
  isEditMode = false;
  reservationId: number;
  reservationData: Reservation = new Reservation();
  defaultReservation = {status: false, initialDate: '', endDate: '', accountId: 0, officeId: 0};

  constructor(private httpDataService: HttpDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetReservation();
    this.isEditMode = false;
  }
  navigateToReservations(): void {
    this.router.navigate(['/my-reservations']);
  }
  resetReservation(): void {
    this.reservationData = this.defaultReservation;
  }
  retrieveReservation(id): void {
    this.httpDataService.getItem(id)
      .subscribe(() => {
        this.reservationData = {} as Reservation;
        this.reservationData = _.cloneDeep(Response);
        console.log(Response);
        console.log(this.reservationData);
      });
  }

  cancelEdit(): void {
    this.navigateToReservations();
  }

  addReservation(): void {
    const newReservation = { status: this.reservationData.status, initialDate: this.reservationData.initialDate,
      endDate: this.reservationData.endDate, OfficeId: this.reservationData.officeId, AccountId: this.reservationData.accountId };
    this.httpDataService.createReservation(newReservation)
      .subscribe(() => {
        this.navigateToReservations();
      });
  }

  onSubmit(): void {
    if (this.reservationForm.form.valid) {
      console.log(this.reservationData);
      this.addReservation();
    } else {
      console.log('Invalid Data');
    }
  }

}
