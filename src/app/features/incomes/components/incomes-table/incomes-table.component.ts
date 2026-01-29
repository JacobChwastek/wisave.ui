import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AutoComplete } from 'primeng/autocomplete';
import { Button, ButtonDirective, ButtonIcon } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { DatePicker } from 'primeng/datepicker';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';

import { IIncome } from '@features/incomes/types/incomes.interfaces';
import { v7 as uuid } from 'uuid';

import { Currency } from '@core/types';

@Component({
  selector: 'app-incomes-table',
  imports: [CurrencyPipe, DatePipe, FormsModule, NgClass, AutoComplete, Button, ButtonDirective, ButtonIcon, Chip, DatePicker, IconField, InputIcon, InputText, Ripple, TableModule],
  templateUrl: './incomes-table.component.html',
  styles: `
    :host {
      display: flex;
      flex: 1;
    }
  `,
})
export class IncomesTableComponent {
  readonly isLoading = input.required<boolean>();
  readonly data = input.required<IIncome[]>();

  readonly newIncomeId = signal<string | null>(null);

  searchValue: string | undefined;
  filteredCategories: string[] = [];

  readonly #clonedIncomes = new Map<string, IIncome>();

  readonly availableCategories = computed(() => {
    const allCategories = this.data().flatMap((income) => income.category);
    return [...new Set(allCategories)].sort();
  });

  readonly isNewIncome = (incomeId: string): boolean => this.newIncomeId() === incomeId;

  clear(table: Table): void {
    table.clear();
    this.searchValue = '';
  }

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
