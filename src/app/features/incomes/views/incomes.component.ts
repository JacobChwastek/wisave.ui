import { Component, computed, effect, inject, OnInit } from '@angular/core';

import { Divider } from 'primeng/divider';
import { TableModule } from 'primeng/table';

import { IncomesTableComponent, PageNavigationEvent, PageSizeChangeEvent } from '@features/incomes/components/incomes-table/incomes-table.component';
import { incomesPageEvents } from '@features/incomes/store/incomes.events';
import { IncomesStore } from '@features/incomes/store/incomes.store';
import { injectDispatch } from '@ngrx/signals/events';

@Component({
  selector: 'app-incomes',
  imports: [TableModule, Divider, IncomesTableComponent],
  template: `
    <div class="flex h-full flex-1 p-4">
      <div class="flex w-3/4">
        <app-incomes-table
          [isLoading]="store.isLoading()"
          [data]="incomes()"
          [totalRecords]="store.pagination().totalRecords"
          [rows]="store.pagination().rows"
          [currentPage]="store.pagination().currentPage"
          [pageInfo]="store.pagination().pageInfo"
          (navigatePage)="onNavigatePage($event)"
          (pageSizeChange)="onPageSizeChange($event)" />
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
  readonly dispatch = injectDispatch(incomesPageEvents);

  incomes = computed(() => this.store.entities());

  ngOnInit(): void {
    this.dispatch.opened();
  }

  onNavigatePage(event: PageNavigationEvent): void {
    this.dispatch.navigatePage({ direction: event.direction, cursor: event.cursor, pageSize: event.pageSize });
  }

  onPageSizeChange(event: PageSizeChangeEvent): void {
    this.dispatch.pageSizeChanged({ rows: event.rows });
  }
}
