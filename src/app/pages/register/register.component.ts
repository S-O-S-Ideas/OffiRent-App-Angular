import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Account} from '../../models/account';
import {HttpDataService} from '../../services/http-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm', {static: false})
  registerForm: NgForm;
  hide = true;
  hide2 = true;
  registerData: Account = new Account();
  constructor(private httpDataService: HttpDataService,  private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  //  this.registerForm = this.formBuilder.group({
  //    name: [null, [Validators.required]],
  //    lastName: [null, [Validators.required]],
  //    email: [null, [Validators.required]],
  //    password: [null, [Validators.required, Validators.minLength(6)]]
  //  });
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  register(): void{
    const newStudent = {firstName: this.registerData.firstName, lastName: this.registerData.lastName,
      email: this.registerData.email};
    this.httpDataService.createAccount(newStudent)
      .subscribe(() => {
        this.navigateToLogin();
      });
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.register();
    console.log(this.registerForm.value);
  }
}
