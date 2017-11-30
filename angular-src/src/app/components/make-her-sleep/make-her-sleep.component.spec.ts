import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeHerSleepComponent } from './make-her-sleep.component';

describe('MakeHerSleepComponent', () => {
  let component: MakeHerSleepComponent;
  let fixture: ComponentFixture<MakeHerSleepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeHerSleepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeHerSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
