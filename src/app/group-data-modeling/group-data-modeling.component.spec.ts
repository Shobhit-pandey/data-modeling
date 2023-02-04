import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDataModelingComponent } from './group-data-modeling.component';

describe('GroupDataModelingComponent', () => {
  let component: GroupDataModelingComponent;
  let fixture: ComponentFixture<GroupDataModelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDataModelingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupDataModelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
