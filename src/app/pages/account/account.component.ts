import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Account} from '../../models/account';
import {HttpDataService} from '../../services/http-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('accountForm', { static: false })
  accountForm: NgForm;
  isEditMode = false;
  accountId: number;
  closeResult = '';
  accountData: Account = new Account();
  defaultAccount = {
    id: 0,
    firstName: '',
    lastName: '',
    isPremium: false,
    email: '',
    password: '',
    identification: '',
    phoneNumber: null};
  constructor(
    private httpDataService: HttpDataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  open(content): void {
    this.modalService.open(content,
      {ariaLabelledBy: 'modal-basic-title'}).
    result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${AccountComponent.getDismissReason(reason)}`;
    });
  }
  ngOnInit(): void {
    this.accountId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveAccount(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetAccount();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToAccount(): void {
    this.router.navigate(['/profile']);
  }

  resetAccount(): void {
    this.accountData = this.defaultAccount;
  }
  retrieveAccount(id): void {
    this.httpDataService.getItem(id)
      .subscribe(() => {
        this.accountData = {} as Account;
        this.accountData = _.cloneDeep(Response);
        console.log(Response);
        console.log(this.accountData);
      });
  }
  cancelEdit(): void {
    this.navigateToAccount();
  }

  updateAccount(): void {
    this.httpDataService.updateItem(this.accountData.id, this.accountData as Account);
    this.navigateToAccount();
  }


  onSubmit(): void {
    if (this.accountForm.form.valid) {
      console.log(this.accountData);
      if (this.isEditMode) {
        this.updateAccount();
      } else {
        this.cancelEdit();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
