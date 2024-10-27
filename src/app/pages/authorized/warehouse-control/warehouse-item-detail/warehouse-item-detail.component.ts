import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-warehouse-item-detail',
  standalone: true,
  imports: [],
  templateUrl: './warehouse-item-detail.component.html',
})
export class WarehouseItemDetailComponent implements OnInit {
  id!: number;

  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.id =+ params['id'];
    });
  }
}
