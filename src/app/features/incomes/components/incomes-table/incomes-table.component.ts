import { CurrencyPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button, ButtonDirective } from 'primeng/button';
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
  imports: [TableModule, Button, IconField, InputIcon, InputText, DatePipe, CurrencyPipe, NgClass, Chip, FormsModule, DatePicker, ButtonDirective, Ripple],
  templateUrl: './incomes-table.component.html',
  styles: `
    :host {
      display: flex;
      flex: 1;
    }
  `,
})
export class IncomesTableComponent {
  isLoading = input.required<boolean>();
  data = input.required<IIncome[]>();

  searchValue: string | undefined;
  clonedIncomes: { [s: string]: IIncome } = {};
  newIncomeId: string | null = null;

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  addNewIncome() {
    const newIncome: IIncome = {
      id: uuid(),
      date: new Date(),
      description: '',
      category: [],
      amount: { amount: 0, currency: Currency.PLN },
      recurring: false,
    };
    this.newIncomeId = newIncome.id;
    this.data().unshift(newIncome);
  }

  onRowEditInit(income: IIncome) {
    this.clonedIncomes[income.id] = { ...income };
  }

  onRowEditSave(income: IIncome) {
    delete this.clonedIncomes[income.id];
    if (this.newIncomeId === income.id) {
      this.newIncomeId = null;
    } else {
    }
  }

  onRowEditCancel(income: IIncome, index: number) {
    if (this.newIncomeId === income.id) {
      this.data().splice(index, 1);
      this.newIncomeId = null;
    } else {
      this.data()[index] = this.clonedIncomes[income.id];
    }
    delete this.clonedIncomes[income.id];
  }

  onRowDelete(income: IIncome, index: number) {
    if (this.newIncomeId === income.id) {
      this.data().splice(index, 1);
      this.newIncomeId = null;
    } else {
      this.data().splice(index, 1);
    }
  }

  isNewIncome(income: IIncome): boolean {
    return this.newIncomeId === income.id;
  }
}
