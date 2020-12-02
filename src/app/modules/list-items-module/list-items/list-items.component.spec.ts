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

  let completedItems$: Observable<ItemInterface[]>;
  let incompletedItems$: Observable<ItemInterface[]>;

  const completedItemsArray = [{
    id: 1,
    name: 'First',
    isDone: true,
    listId: 1,
  }];

  const incompletedItemsArray = [{
    id: 1,
    name: 'First',
    isDone: true,
    listId: 1,
  }];

  const fakeActivatedRoute = {
    snapshot: { params: { id: 1 } },
  };

  const service = jasmine.createSpyObj(
    'ItemsService',
    ['getItems$', 'getListName$', 'completedItems$', 'incompletedItems$'],
  );

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

    service.completedItems$ = of(completedItemsArray);
    service.incompletedItems$ = of(incompletedItemsArray);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data via Lists Service', () => {
    completedItems$ = service.completedItems$;
    incompletedItems$ = service.incompletedItems$;

    completedItems$.subscribe((data) => expect(data.length).toBe(1));
    incompletedItems$.subscribe((data) => expect(data.length).toBe(1));
  });
});
