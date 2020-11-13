import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './pages/students/students.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {StudentComponent} from './pages/student/student.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {ReservationComponent} from './pages/reservation/reservation.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students', component: StudentsComponent },
  { path: 'students/new', component: StudentComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: 'my-reservations', component: ReservationsComponent},
  { path: 'my-reservations/new', component: ReservationComponent},
  { path: 'my-reservations/:id', component: ReservationComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
