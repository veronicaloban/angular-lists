import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ItemInterface } from '../item';

import { ListItemsService } from '../list-items.service';
import { AddItemFormComponent } from './add-item-form.component';

describe('AddItemFormComponent', () => {
  let component: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;
  let debugElement: DebugElement;

  let mockDialogRef;
  let mockService;
  let MOCK_MAT_DIALOG_DATA;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockService = jasmine.createSpyObj('ItemsService', ['createItem$']);

    MOCK_MAT_DIALOG_DATA = {
      currentListId: '1',
    };
    await TestBed.configureTestingModule({
      declarations: [AddItemFormComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: MOCK_MAT_DIALOG_DATA,
        },
        {
          provide: ListItemsService,
          useValue: mockService,
        }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemFormComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the addItemForm when the cancel button is clicked', () => {
    const cancelButton = debugElement.query(By.css('.add-item__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should close dialog when ADD button clicked and name.length is more then 0', () => {
    component.name = 'Second';
    const addButton = debugElement.query(By.css('.add-item__add'));

    addButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should not close dialog when edit button clicked but name.length equals 0', () => {
    component.name = '';

    const addButton = debugElement.query(By.css('.add-item__add'));

    addButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(0, 'dialog is not closed');
  });
});
