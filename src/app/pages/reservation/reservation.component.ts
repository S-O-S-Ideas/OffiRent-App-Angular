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
  defaultReservation = {id: 0, status: false, initialDate: '', endDate: ''};

  constructor(private httpDataService: HttpDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationId =  Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveReservation(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetReservation();
        this.isEditMode = false;
        return 0;
      }
    }));
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
      endDate: this.reservationData.endDate };
    this.httpDataService.createItem(newReservation)
      .subscribe(() => {
        this.navigateToReservations();
      });
  }
  updateReservation(): void {
    this.httpDataService.updateItem(this.reservationData.id, this.reservationData as Reservation);
    this.navigateToReservations();
  }
  onSubmit(): void {
    if (this.reservationForm.form.valid) {
      console.log(this.reservationData);
      if (this.isEditMode) {
        this.updateReservation();
      } else {
        this.addReservation();
      }
    } else {
      console.log('Invalid Data');
    }
  }

}
