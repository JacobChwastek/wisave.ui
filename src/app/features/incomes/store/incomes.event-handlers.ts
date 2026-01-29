import { inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';

import { mapResponse } from '@ngrx/operators';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';

import { IncomesApiService } from '../services/incomes-api.service';
import { incomesApiEvents, incomesPageEvents } from './incomes.events';

export function withIncomesEventHandlers() {
  return signalStoreFeature(
    withEventHandlers((_, events = inject(Events), api = inject(IncomesApiService)) => ({
      // Load incomes on page opened
      loadIncomes$: events.on(incomesPageEvents.opened).pipe(
        switchMap(() =>
          api.getAll().pipe(
            mapResponse({
              next: (incomes) => incomesApiEvents.loadedSuccess({ incomes }),
              error: (error: { message: string }) => incomesApiEvents.loadedFailure({ error: error.message }),
            }),
          ),
        ),
      ),

      // Add income
      addIncome$: events.on(incomesPageEvents.add).pipe(
        switchMap(({ payload }) =>
          api.create(payload.income).pipe(
            mapResponse({
              next: (income) => incomesApiEvents.addedSuccess({ income }),
              error: (error: { message: string }) => incomesApiEvents.addedFailure({ error: error.message }),
            }),
          ),
        ),
      ),

      // Update income
      updateIncome$: events.on(incomesPageEvents.update).pipe(
        switchMap(({ payload }) =>
          api.update(payload.id, payload.changes).pipe(
            mapResponse({
              next: (income) => incomesApiEvents.updatedSuccess({ income }),
              error: (error: { message: string }) => incomesApiEvents.updatedFailure({ id: payload.id, error: error.message }),
            }),
          ),
        ),
      ),

      // Remove income
      removeIncome$: events.on(incomesPageEvents.remove).pipe(
        switchMap(({ payload }) =>
          api.delete(payload.id).pipe(
            mapResponse({
              next: () => incomesApiEvents.removedSuccess({ id: payload.id }),
              error: (error: { message: string }) => incomesApiEvents.removedFailure({ id: payload.id, error: error.message }),
            }),
          ),
        ),
      ),

      // Log errors
      logErrors$: events
        .on(incomesApiEvents.loadedFailure, incomesApiEvents.addedFailure, incomesApiEvents.updatedFailure, incomesApiEvents.removedFailure)
        .pipe(tap(({ payload }) => console.error('[Incomes API Error]', payload))),
    })),
  );
}
