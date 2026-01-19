import { eventGroup } from '@ngrx/signals/events';

export const incomesEvents = eventGroup({
  source: 'Incomes',
  events: {},
});

export const incomeApiEvents = eventGroup({
  source: 'Incomes API',
  events: {},
});
