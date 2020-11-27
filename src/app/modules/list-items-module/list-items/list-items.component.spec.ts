import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ListItemsComponent } from './list-items.component';
import { ItemInterface } from '../item';
import { ListItemsService } from '../list-items.service';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  let items$: Observable<ItemInterface[]>;
  let serviceItems$: Observable<ItemInterface[]>;
  const dataArray = [{
    id: 1,
    name: 'First',
    isDone: true,
    listId: 1,
  }];

  const fakeActivatedRoute = {
    snapshot: { params: { id: 1 } },
  };

  const service = jasmine.createSpyObj('ItemsService', ['getItems$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListItemsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: ListItemsService, useValue: service },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;

    service.getItems$.and.returnValue(of(dataArray));
    serviceItems$ = of(dataArray);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data via Lists Service', () => {
    items$ = serviceItems$;

    items$.subscribe((data) => { expect(data.length).toBe(1); });
  });
});
