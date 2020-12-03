import {
  ComponentFixture, TestBed, fakeAsync, tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ListComponent } from './list.component';
import { ListsMaterialModule } from '../lists-material.module';
import { StoreService } from '../../../store.service';

import { routes } from '../../../app-routing.module';
import { ListItemsModule } from '../../list-items-module/list-items.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dialog: MatDialog;
  const list1 = {
    id: 1, name: 'First', total: 10, completed: 5,
  };
  const list2 = {
    id: 2, name: 'Second', total: 10, completed: 10,
  };

  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        ListsMaterialModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        ListItemsModule,
      ],
      providers: [StoreService, MatDialog],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        component.list = list1;
        dialog = <MatDialog>TestBed.get(MatDialog);

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
    spyOn(dialog, 'open').and.callThrough();
    component.openEditDialog();
    fixture.detectChanges();
    tick();

    expect(dialog.open).toHaveBeenCalled();// TODO С bind тест падает
  }));

  it('should navigate to /list/1', fakeAsync(() => {
    router.navigate([`list/${list1.id}`]);
    tick();

    expect(location.path()).toBe('/list/1');
  }));
});
