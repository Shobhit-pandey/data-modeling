import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineDataModelingComponent } from './combine-data-modeling.component';

describe('CombineDataModelingComponent', () => {
  let component: CombineDataModelingComponent;
  let fixture: ComponentFixture<CombineDataModelingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombineDataModelingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombineDataModelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
