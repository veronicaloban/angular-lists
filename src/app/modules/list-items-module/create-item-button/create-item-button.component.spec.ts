import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { CreateItemButtonComponent } from './create-item-button.component';

describe('CreateItemButtonComponent', () => {
  let component: CreateItemButtonComponent;
  let fixture: ComponentFixture<CreateItemButtonComponent>;
  let debugElement: DebugElement;

  const matDialogMock = {
    open: (): { afterClosed(): Observable<string> } => ({
      afterClosed: (): Observable<string> => of('item'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateItemButtonComponent],
      providers: [{ provide: MatDialog, useValue: matDialogMock }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the addItemForm when the + button is clicked', () => {
    spyOn(matDialogMock, 'open').and.callThrough();

    const openButton = debugElement.query(By.css('button'));

    openButton.triggerEventHandler('click', null);

    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should return a name when closed', () => {
    const dialogRef = matDialogMock.open();

    dialogRef.afterClosed().subscribe((result) => expect(result).toBe('item'));
  });
});
