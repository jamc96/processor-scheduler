import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFramesComponent } from './table-frames.component';

describe('TableFramesComponent', () => {
  let component: TableFramesComponent;
  let fixture: ComponentFixture<TableFramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFramesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
