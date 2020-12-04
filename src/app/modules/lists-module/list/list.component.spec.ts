import {
  ComponentFixture, TestBed, fakeAsync, tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { ListsMaterialModule } from '../lists-material.module';
import { routes } from '../../../app-routing.module';
import { ListItemsModule } from '../../list-items-module/list-items.module';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dialog: MatDialog;
  let debugElement: DebugElement;
  const list1 = {
    id: 1, name: 'First', total: 10, completed: 5,
  };
  const list2 = {
    id: 2, name: 'Second', total: 10, completed: 10,
  };

  let location: Location;
  let router: Router;

  const matDialogMock = {
    open: (): { afterClosed(): Observable<string> } => ({
      afterClosed: (): Observable<string> => of('list'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        ListsMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        ListItemsModule,
      ],
      providers: [{ provide: MatDialog, useValue: matDialogMock }],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        component.list = {
          id: 1,
          name: 'First',
          total: 10,
          completed: 5,
        };

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        router.initialNavigation();
        fixture.detectChanges();
      });
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should return false because not all items are completed', () => {
    expect(component.isEverythingDone).toBe(false);
  });

  it('should return true because everything is done', () => {
    component.list = list2;

    expect(component.isEverythingDone).toBe(true);
  });

  it('should return 50', () => {
    expect(component.listProgress).toBe(50);
  });

  it('should return 100', () => {
    component.list = list2;

    expect(component.listProgress).toBe(100);
  });

  it('should render name in a mat-card-title tag', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-title').textContent).toContain('First');
  });

  it('should render progress in a mat-card-content tag', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-content').textContent).toContain('5/10');
  });

  it('should open edit form when the openEditDialog is called', fakeAsync(() => {
    spyOn(matDialogMock, 'open').and.callThrough();
    component.openEditDialog();
    fixture.detectChanges();
    tick();

    expect(matDialogMock.open).toHaveBeenCalled();// TODO С bind тест падает
  }));

  it('should navigate to /list/1', fakeAsync(() => {
    router.navigate([`list/${list1.id}`]);
    tick();

    expect(location.path()).toBe('/list/1');
  }));

  it('should emit deleteItem when the onDelete method is called', fakeAsync(() => {
    spyOn(component.deleteList, 'emit');

    component.onDeleteList();
    fixture.detectChanges();
    tick();

    expect(component.deleteList.emit).toHaveBeenCalledWith(component.list);
  }));

  it('should emit editList when the openEditForm is closed with a value', fakeAsync(() => {
    spyOn(component.editList, 'emit');

    component.openEditDialog();

    fixture.detectChanges();
    tick();

    const dialogRef = matDialogMock.open();

    dialogRef.afterClosed().subscribe((result) => {
      expect(result).toBe('list');
      expect(component.editList.emit).toHaveBeenCalledWith({ name: 'list', listId: component.list.id });
    });
  }));
});
