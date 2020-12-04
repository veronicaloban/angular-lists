import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { CreateListButtonComponent } from './create-list-button.component';

describe('CreateListButtonComponent', () => {
  let component: CreateListButtonComponent;
  let fixture: ComponentFixture<CreateListButtonComponent>;
  let debugElement: DebugElement;

  const matDialogMock = {
    open: (): { afterClosed(): Observable<string> } => ({
      afterClosed: (): Observable<string> => of('list'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateListButtonComponent],
      providers: [{ provide: MatDialog, useValue: matDialogMock }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open Dialog when + button is clicked', () => {
    spyOn(matDialogMock, 'open').and.callThrough();

    const button = debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(matDialogMock.open).toHaveBeenCalled();// TODO С bind тест падает
  });

  it('should return a name when closed', () => {
    const dialogRef = matDialogMock.open();

    dialogRef.afterClosed().subscribe((result) => expect(result).toBe('list'));
  });
});
