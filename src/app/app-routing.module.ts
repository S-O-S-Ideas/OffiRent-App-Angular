import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './pages/students/students.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {StudentComponent} from './pages/student/student.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {OfficeComponent} from './pages/office/office.component';
import {OfficesComponent} from './pages/offices/offices.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students', component: StudentsComponent },
  { path: 'students/new', component: StudentComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: 'my-offices', component: OfficesComponent },
  { path: 'my-offices/new', component: OfficeComponent },
  { path: 'my-offices/:id', component: OfficeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
