import { withDevtools, withGlitchTracking } from '@angular-architects/ngrx-toolkit';
import { IIncome } from '@features/incomes/types/incomes.interfaces';
import { signalStore, withState } from '@ngrx/signals';
import { v7 as uuid } from 'uuid';

import { Currency } from '@core/types';

type IncomesStoreState = {
  incomes: IIncome[];
  isLoading: boolean;
  filter: { query: ''; order: 'asc' };
};

const initialState: IncomesStoreState = {
  incomes: [
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
  ],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const IncomesStore = signalStore({ providedIn: 'root' }, withDevtools('Incomes', withGlitchTracking()), withState(initialState));
