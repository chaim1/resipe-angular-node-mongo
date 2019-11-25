import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForMobileComponent } from './search-for-mobile.component';

describe('SearchForMobileComponent', () => {
  let component: SearchForMobileComponent;
  let fixture: ComponentFixture<SearchForMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchForMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
