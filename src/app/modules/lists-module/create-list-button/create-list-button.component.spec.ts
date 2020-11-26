import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CreateListButtonComponent } from './create-list-button.component';
import { ListsMaterialModule } from '../lists-material.module';

describe('CreateListButtonComponent', () => {
  let component: CreateListButtonComponent;
  let fixture: ComponentFixture<CreateListButtonComponent>;
  let debugElement: DebugElement;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateListButtonComponent],
      imports: [ListsMaterialModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dialog = <MatDialog>TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open Dialog when + button is clicked', () => {
    spyOn(dialog, 'open').and.callThrough();

    const button = debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dialog.open).toHaveBeenCalled();// TODO С bind тест падает
  });
});
