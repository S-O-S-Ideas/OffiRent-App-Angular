import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesSearchComponent } from './offices-search.component';

describe('OfficesSearchComponent', () => {
  let component: OfficesSearchComponent;
  let fixture: ComponentFixture<OfficesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
