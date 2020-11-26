import { Component, OnInit } from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor( private httpDataService: HttpDataService) { }
  ngOnInit(): void {
  }

}
