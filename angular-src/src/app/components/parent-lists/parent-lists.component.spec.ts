import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentListsComponent } from './parent-lists.component';

describe('ParentListsComponent', () => {
  let component: ParentListsComponent;
  let fixture: ComponentFixture<ParentListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
