import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResourceComponent } from './table-resource.component';

describe('TableResourceComponent', () => {
  let component: TableResourceComponent;
  let fixture: ComponentFixture<TableResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
