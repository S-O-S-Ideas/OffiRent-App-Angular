import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Account } from '../../models/account';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Office} from "../../models/office";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, AfterViewInit {

  constructor(
    private httpDataService: HttpDataService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    this.accountData = {} as Account;
   }
  @ViewChild('accountForm', { static: false })
  accountForm: NgForm;
  submitted = false;
  registerForm: FormGroup;
  accountData: Account;
  accounts: Array<any>;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'password', 'identification', 'phoneNumber', 'isPremium'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;
  closeResult = '';

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
        `Dismissed ${AccountsComponent.getDismissReason(reason)}`;
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      identification: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.minLength(9)]
    });
    this.retrieveAccount(2);
    this.httpDataService.getProfile().subscribe(data => this.accounts = data);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  retrieveAccount(id): void {
    this.httpDataService.getAccount(id)
      .subscribe((Response) => {
        this.accountData = {} as Account;
        this.accountData = _.cloneDeep(Response);
        console.log(Response);
        console.log(this.accountData);
      });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   get f(){
    return this.registerForm.controls;
   }
  editItem(element): void {
    console.log(element);
    this.accountData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.accountForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Account) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
   updateAccount(): void {
    this.httpDataService.updateItem(this.accountData.id, this.accountData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Account) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log('email=' + this.f.email.value);
    console.log('username=' + this.f.firstName.value);
    console.log('password=' + this.f.password.value);
  }
  navigateToEditAccount(): void {
    this.router.navigate([`/profile/edit`]).then(() => null);
  }
}
