import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Office} from '../../models/office';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-offices',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  @ViewChild('officeForm', { static: false })
  officeForm: NgForm;
  isEditMode = false;
  officeId: number;
  officeData: Office = new Office();
  updateData: Office = new Office();
  defaultOffice = { id: 0, address: '', floor: null, capacity: null, allowResource: true, score: 0, description: '',
    price: null, status: true, comment: '', accountId: 0, districtId: 0};
  constructor(private httpDataService: HttpDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.officeId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveOffice(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetOffice();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToOffices(): void {
    this.router.navigate(['/my-offices']);
  }
  resetOffice(): void {
    this.officeData = this.defaultOffice;
  }
  retrieveOffice(id): void {
    console.log('se esta retriven');
    this.httpDataService.getOffice(id)
      .subscribe((Response) => {
        this.officeData = {} as Office;
        this.officeData = _.cloneDeep(Response);
        console.log(Response);
        console.log(this.officeData);
      });
  }
  addOffice(): void {
    const newOffice = { id: this.officeData.id, address: this.officeData.address, floor: this.officeData.floor,
      capacity: this.officeData.capacity, description: this.officeData.description,
      price: this.officeData.price, comment: this.officeData.comment, accountId: this.officeData.accountId,
      districtId: this.officeData.districtId};
    this.httpDataService.createOfficina(newOffice)
      .subscribe(() => {
        this.navigateToOffices();
      });
  }
  cancelEdit(): void {
    this.navigateToOffices();
  }

  updateOffice(): void {
    console.log('se esta guardadno');
    console.log(this.officeData);
    this.httpDataService.updateOfficina(this.officeData.id, this.officeData as Office);
    this.navigateToOffices();
  }
  onSubmit(): void {
    if (this.officeForm.form.valid) {
      console.log(this.officeData);
      if (this.isEditMode) {
        this.updateOffice();
      } else {
        this.addOffice();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
