import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewListButtonComponent } from './create-new-list-button.component';
import { ListsMaterialModule } from '../lists-material.module';

describe('CreateNewListButtonComponent', () => {
  let component: CreateNewListButtonComponent;
  let fixture: ComponentFixture<CreateNewListButtonComponent>;
  let debugElement: DebugElement;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewListButtonComponent],
      imports: [ListsMaterialModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewListButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open Dialog when + button is clicked', () => {
    spyOn(dialog, 'open').and.callThrough();
    const button = debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalled();
  });
});
