import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAuthComponent } from './footer-auth.component';

describe('FooterAuthComponent', () => {
  let component: FooterAuthComponent;
  let fixture: ComponentFixture<FooterAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
