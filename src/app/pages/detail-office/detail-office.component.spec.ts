import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOfficeComponent } from './detail-office.component';

describe('DetailOfficeComponent', () => {
  let component: DetailOfficeComponent;
  let fixture: ComponentFixture<DetailOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
