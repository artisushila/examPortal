import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQusetionComponent } from './add-qusetion.component';

describe('AddQusetionComponent', () => {
  let component: AddQusetionComponent;
  let fixture: ComponentFixture<AddQusetionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQusetionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQusetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
