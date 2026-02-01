import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { IIncome } from '@features/incomes/types/incomes.interfaces';

// UI/Component events - commands from user interactions
export const incomesPageEvents = eventGroup({
  source: 'Incomes Page',
  events: {
    opened: type<void>(),
    add: type<{ income: Omit<IIncome, 'id'> }>(),
    update: type<{ id: string; changes: Partial<IIncome> }>(),
    remove: type<{ id: string }>(),
    filterChanged: type<{ query?: string; order?: 'asc' | 'desc' }>(),
  },
});

// API response events - results from async operations
export const incomesApiEvents = eventGroup({
  source: 'Incomes API',
  events: {
    loadedSuccess: type<{ incomes: IIncome[] }>(),
    loadedFailure: type<{ error: string }>(),
    addedSuccess: type<{ income: IIncome }>(),
    addedFailure: type<{ error: string }>(),
    updatedSuccess: type<{ income: IIncome }>(),
    updatedFailure: type<{ id: string; error: string }>(),
    removedSuccess: type<{ id: string }>(),
    removedFailure: type<{ id: string; error: string }>(),
  },
});
