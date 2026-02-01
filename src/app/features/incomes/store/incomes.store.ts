import { withDevtools, withGlitchTracking, withTrackedReducer } from '@angular-architects/ngrx-toolkit';
import { IIncome } from '@features/incomes/types/incomes.interfaces';
import { signalStore, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { on } from '@ngrx/signals/events';

import { withIncomesEventHandlers } from './incomes.event-handlers';
import { incomesApiEvents, incomesPageEvents } from './incomes.events';
import { initialState } from './incomes.state';

interface IncomesFilter {
  query: string;
  order: 'asc' | 'desc';
}

interface IncomesStoreState {
  isLoading: boolean;
  filter: IncomesFilter;
}

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
  withDevtools('Incomes', withGlitchTracking()),
  withState(initialState),
  withEntities<IIncome>(),
  withTrackedReducer(
    on(incomesPageEvents.opened, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.add, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.update, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.remove, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.filterChanged, ({ payload }, state) => ({
      filter: {
        ...state.filter,
        ...(payload.query !== undefined && { query: payload.query }),
        ...(payload.order !== undefined && { order: payload.order }),
      },
    })),

    on(incomesApiEvents.loadedSuccess, ({ payload }) => [setAllEntities<IIncome>(payload.incomes), () => ({ isLoading: false, error: null })]),
    on(incomesApiEvents.addedSuccess, ({ payload }) => [addEntity<IIncome>(payload.income), () => ({ isLoading: false, error: null })]),
    on(incomesApiEvents.updatedSuccess, ({ payload }) => [updateEntity<IIncome>({ id: payload.income.id, changes: payload.income }), () => ({ isLoading: false, error: null })]),
    on(incomesApiEvents.removedSuccess, ({ payload }) => [removeEntity(payload.id), () => ({ isLoading: false, error: null })]),

    on(incomesApiEvents.loadedFailure, ({ payload }) => ({
      isLoading: false,
      error: payload.error,
    })),
    on(incomesApiEvents.addedFailure, ({ payload }) => ({
      isLoading: false,
      error: payload.error,
    })),
    on(incomesApiEvents.updatedFailure, ({ payload }) => ({
      isLoading: false,
      error: payload.error,
    })),
    on(incomesApiEvents.removedFailure, ({ payload }) => ({
      isLoading: false,
      error: payload.error,
    })),
  ),
  withIncomesEventHandlers(),
);
