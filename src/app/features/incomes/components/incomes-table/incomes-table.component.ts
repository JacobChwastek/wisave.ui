import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AutoComplete } from 'primeng/autocomplete';
import { Button, ButtonDirective, ButtonIcon } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { IIncome } from '@features/incomes/types/incomes.interfaces';
import { CursorDirection, IPageInfo } from '@shared/types';
import { v7 as uuid } from 'uuid';

import { Currency } from '@core/types';

export interface PageNavigationEvent {
  direction: CursorDirection;
  cursor: string | null;
  pageSize: number;
}

export interface PageSizeChangeEvent {
  rows: number;
}

@Component({
  selector: 'app-incomes-table',
  imports: [CurrencyPipe, DatePipe, FormsModule, AutoComplete, Button, ButtonDirective, ButtonIcon, Chip, DatePicker, InputText, Ripple, Select, TableModule],
  templateUrl: './incomes-table.component.html',
  styles: `
    :host {
      display: flex;
      flex: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesTableComponent {
  readonly isLoading = input.required<boolean>();
  readonly data = input.required<IIncome[]>();
  readonly totalRecords = input<number>(0);
  readonly rows = input<number>(10);
  readonly currentPage = input<number>(1);
  readonly pageInfo = input.required<IPageInfo>();

  readonly navigatePage = output<PageNavigationEvent>();
  readonly pageSizeChange = output<PageSizeChangeEvent>();

  readonly newIncomeId = signal<string | null>(null);

  readonly rowsPerPageOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
  ];

  filteredCategories: string[] = [];

  readonly #clonedIncomes = new Map<string, IIncome>();

  readonly availableCategories = computed(() => {
    const allCategories = this.data().flatMap((income) => income.category);
    return [...new Set(allCategories)].sort();
  });

  readonly totalPages = computed(() => Math.ceil(this.totalRecords() / this.rows()));

  readonly paginationInfo = computed(() => {
    const total = this.totalRecords();
    const page = this.currentPage();
    const size = this.rows();
    const start = (page - 1) * size + 1;
    const end = Math.min(page * size, total);
    return `${start}-${end} of ${total}`;
  });

  readonly isNewIncome = (incomeId: string): boolean => this.newIncomeId() === incomeId;

  filterCategories(event: { query: string }): void {
    const query = event.query.toLowerCase();
    const available = this.availableCategories();

    this.filteredCategories = available.filter((cat) => cat.toLowerCase().includes(query));

    if (query && !this.filteredCategories.some((cat) => cat.toLowerCase() === query)) {
      this.filteredCategories.push(query);
    }
  }

  addNewIncome(): void {
    const newIncome: IIncome = {
      id: uuid(),
      date: new Date(),
      description: '',
      category: [],
      amount: { amount: 0, currency: Currency.PLN },
      recurring: false,
    };

    this.newIncomeId.set(newIncome.id);
    this.data().unshift(newIncome);
  }

  onRowEditInit(income: IIncome): void {
    this.#clonedIncomes.set(income.id, { ...income });
  }

  onRowEditSave(income: IIncome): void {
    this.#clonedIncomes.delete(income.id);

    if (this.isNewIncome(income.id)) {
      this.newIncomeId.set(null);
    }
  }

  onPreviousPage(): void {
    this.navigatePage.emit({
      direction: 'previous',
      cursor: this.pageInfo().startCursor,
      pageSize: this.rows(),
    });
  }

  onNextPage(): void {
    this.navigatePage.emit({
      direction: 'next',
      cursor: this.pageInfo().endCursor,
      pageSize: this.rows(),
    });
  }

  onPageSizeChange(rows: number): void {
    this.pageSizeChange.emit({ rows });
  }

  onRowEditCancel(income: IIncome, index: number): void {
    if (this.isNewIncome(income.id)) {
      this.data().splice(index, 1);
      this.newIncomeId.set(null);
    } else {
      const cloned = this.#clonedIncomes.get(income.id);
      if (cloned) {
        this.data()[index] = cloned;
      }
    }

    this.#clonedIncomes.delete(income.id);
  }

  onRowDelete(income: IIncome, index: number): void {
    this.data().splice(index, 1);

    if (this.isNewIncome(income.id)) {
      this.newIncomeId.set(null);
    }
  }

  onRowArchive(_income: IIncome, index: number): void {
    this.data().splice(index, 1);
  }
}
