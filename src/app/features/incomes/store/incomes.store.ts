import { computed } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { v7 as uuid } from 'uuid';

import { Currency } from '@core/types';
import { IIncome } from '@features/incomes/types/incomes.interfaces';

type IncomesFilter = {
  query: string;
  order: 'asc' | 'desc';
};

type IncomesStoreState = {
  isLoading: boolean;
  filter: IncomesFilter;
};

const initialState: IncomesStoreState = {
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

const initialIncomes: IIncome[] = [
  {
    id: uuid(),
    date: new Date(2026, 1, 18),
    category: ['Job'],
    description: 'Wyplata',
    amount: { amount: 2000, currency: Currency.PLN },
    recurring: true,
  },
  {
    id: uuid(),
    date: new Date(2026, 1, 12),
    category: ['Job'],
    description: 'Wyplata',
    amount: { amount: 10000, currency: Currency.PLN },
    recurring: true,
  },
  {
    id: uuid(),
    date: new Date(2026, 1, 9),
    category: ['Rent', 'Girlfriend'],
    description: 'Mieszkanie',
    amount: { amount: 1000, currency: Currency.PLN },
    recurring: false,
  },
  {
    id: uuid(),
    date: new Date(2026, 1, 3),
    category: ['Girlfriend'],
    description: 'Random',
    amount: { amount: 45, currency: Currency.PLN },
    recurring: false,
  },
  {
    id: uuid(),
    date: new Date(2026, 1, 2),
    category: ['Family', 'Spotify'],
    description: 'Spotify',
    amount: { amount: 19, currency: Currency.PLN },
    recurring: false,
  },
  {
    id: uuid(),
    date: new Date(2025, 12, 23),
    category: ['Other', 'Girlfriend'],
    description: 'Święta',
    amount: { amount: 500, currency: Currency.PLN },
    recurring: false,
  },
  {
    id: uuid(),
    date: new Date(2025, 12, 17),
    category: ['Job'],
    description: 'Wyplata',
    amount: { amount: 4350, currency: Currency.PLN },
    recurring: true,
  },
  {
    id: uuid(),
    date: new Date(2025, 12, 15),
    category: ['Job'],
    description: 'Wyplata',
    amount: { amount: 8, currency: Currency.PLN },
    recurring: true,
  },
  {
    id: uuid(),
    date: new Date(2025, 12, 3),
    category: ['Rent', 'Girlfriend'],
    description: 'Mieszkanie',
    amount: { amount: 1250, currency: Currency.PLN },
    recurring: false,
  },
  {
    id: uuid(),
    date: new Date(2025, 12, 2),
    category: ['Family', 'Spotify'],
    description: 'Spotify',
    amount: { amount: 19, currency: Currency.PLN },
    recurring: false,
  },
];

export const IncomesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Incomes'),
  withState(initialState),
  withEntities<IIncome>(),
  withComputed((store) => ({
    incomes: computed(() => {
      const entities = store.entities();
      const filter = store.filter();

      let result = [...entities];

      if (filter.query) {
        const query = filter.query.toLowerCase();
        result = result.filter(
          (income) => income.description.toLowerCase().includes(query) || income.category.some((cat) => cat.toLowerCase().includes(query))
        );
      }

      result.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return filter.order === 'asc' ? dateA - dateB : dateB - dateA;
      });

      return result;
    }),
    totalAmount: computed(() => {
      return store.entities().reduce((sum, income) => sum + income.amount.amount, 0);
    }),
    categories: computed(() => {
      const allCategories = store.entities().flatMap((income) => income.category);
      return [...new Set(allCategories)].sort();
    }),
  })),
  withMethods((store) => ({
    loadIncomes(): void {
      patchState(store, setAllEntities(initialIncomes));
    },
    addIncome(income: Omit<IIncome, 'id'>): void {
      const newIncome: IIncome = { ...income, id: uuid() };
      patchState(store, addEntity(newIncome));
    },
    updateIncome(id: string, changes: Partial<IIncome>): void {
      patchState(store, updateEntity({ id, changes }));
    },
    removeIncome(id: string): void {
      patchState(store, removeEntity(id));
    },
    setFilter(filter: Partial<IncomesFilter>): void {
      patchState(store, (state) => ({ filter: { ...state.filter, ...filter } }));
    },
    setLoading(isLoading: boolean): void {
      patchState(store, { isLoading });
    },
  }))
);
