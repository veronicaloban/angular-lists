import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public listId: number;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.listId = this.route.snapshot.params.id as number;
  }
}
