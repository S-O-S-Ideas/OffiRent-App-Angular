import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
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
  registerForm: FormGroup;
  submitted = false;
  accounts: Array<any>;
  accountForm: NgForm;
  closeResult = '';
  accountData: Account = new Account();

  constructor(
    private httpDataService: HttpDataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }
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
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      identification: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.minLength(9)],
    });
    this.httpDataService.getProfile().subscribe(data => this.accounts = data);
  }
  navigateToAccount(): void {
    this.router.navigate(['/profile']);
  }

  cancelEdit(): void {
    this.navigateToAccount();
  }
  onUpdateProfile(): void{
    this.httpDataService.updateProfile();
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    console.log('firstName=' + this.f.firstName.value);
    console.log('lastName=' + this.f.lastName.value);
    console.log('identification=' + this.f.identification.value);
    console.log('phoneNumber=' + this.f.phoneNumber.value);
    console.log('email=' + this.f.email.value);
    console.log('password=' + this.f.password.value);
  }
}
