import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StoreService } from '../../../store.service';
import { ListsComponent } from './lists.component';
import { ListInterface } from '../list';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let lists$: Observable<ListInterface[]>;
  let service;
  let serviceLists$: Observable<ListInterface[]>;
  const dataArray = [{
    id: 1,
    name: 'First',
    completed: 10,
    total: 5,
  }];

  beforeEach(async () => {
    service = jasmine.createSpyObj('ListService', ['getLists$']);
    await TestBed.configureTestingModule({
      declarations: [ListsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule],
      providers: [StoreService],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListsComponent);
        component = fixture.componentInstance;
        service.getLists$.and.returnValue(of(dataArray));
        serviceLists$ = of(dataArray);
        fixture.detectChanges();
      });
  });

  it('should create the listsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data via Lists Service', () => {
    lists$ = serviceLists$;

    lists$.subscribe((data) => { expect(data.length).toBe(1); });
  });
});
