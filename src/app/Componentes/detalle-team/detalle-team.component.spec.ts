import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTeamComponent } from './detalle-team.component';

describe('DetalleTeamComponent', () => {
  let component: DetalleTeamComponent;
  let fixture: ComponentFixture<DetalleTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleTeamComponent]
    });
    fixture = TestBed.createComponent(DetalleTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
