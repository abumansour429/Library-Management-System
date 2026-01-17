import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessMatrix } from './access-matrix';

describe('AccessMatrix', () => {
  let component: AccessMatrix;
  let fixture: ComponentFixture<AccessMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessMatrix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessMatrix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
