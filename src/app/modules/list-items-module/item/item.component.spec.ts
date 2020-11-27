import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsMaterialModule } from '../list-items-material.module';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [ListItemsMaterialModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 1,
      name: 'Item1',
      isDone: true,
      listId: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name in a mat-card-title tag', () => {
    const compiledTemplate = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiledTemplate.querySelector('mat-card-title').textContent).toContain('Item1');
  });
});
