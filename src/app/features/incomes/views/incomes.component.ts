import { Component, inject, OnInit } from '@angular/core';

import { Divider } from 'primeng/divider';
import { TableModule } from 'primeng/table';

import { IncomesTableComponent } from '@features/incomes/components/incomes-table/incomes-table.component';
import { IncomesStore } from '@features/incomes/store/incomes.store';

@Component({
  selector: 'app-incomes',
  imports: [TableModule, Divider, IncomesTableComponent],
  template: `
    <div class="flex flex-1 p-4">
      <div class="flex w-3/4">
        <app-incomes-table [isLoading]="store.isLoading()" [data]="store.incomes()" />
      </div>
      <p-divider layout="vertical" />
      <div class="w-1/4">xd</div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,
})
export class IncomesComponent implements OnInit {
  readonly store = inject(IncomesStore);

  ngOnInit(): void {
    this.store.loadIncomes();
  }
}
