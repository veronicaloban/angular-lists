import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StoreService } from '../../../store.service';
import { CreateItemFormComponent } from './create-item-form.component';

describe('AddItemFormComponent', () => {
  let component: CreateItemFormComponent;
  let fixture: ComponentFixture<CreateItemFormComponent>;
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
      declarations: [CreateItemFormComponent],
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
          provide: StoreService,
          useValue: mockService,
        }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemFormComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the addItemForm when the cancel button is clicked', () => {
    const cancelButton = debugElement.query(By.css('.create-item__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should close dialog when ADD button clicked and name.length is more then 0', () => {
    component.name = 'Second';
    const createButton = debugElement.query(By.css('.create-item__add'));

    createButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should not close dialog when edit button clicked but name.length equals 0', () => {
    component.name = '';
    const createButton = debugElement.query(By.css('.create-item__add'));

    createButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(0, 'dialog is not closed');
  });
});
