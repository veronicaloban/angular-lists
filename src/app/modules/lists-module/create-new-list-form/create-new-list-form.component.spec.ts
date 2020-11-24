import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogRef } from '@angular/material/dialog';
import { CreateNewListFormComponent } from './create-new-list-form.component';
import { ListsServiceService } from '../lists-service.service';

describe('CreateNewListComponent', () => {
  let component: CreateNewListFormComponent;
  let fixture: ComponentFixture<CreateNewListFormComponent>;
  let debugElement: DebugElement;
  let mockDialogRef = {
    close: jasmine.createSpy('close'),
  };;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewListFormComponent],
      imports: [HttpClientModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        ListsServiceService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewListFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog form when Cancel button is clicked', () => {
    const cancelButton = debugElement.query(By.css('.create-new-list__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog form when Create button is clicked', () => {
    const createButton = debugElement.query(By.css('.create-new-list__create'));

    createButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
