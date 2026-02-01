import { inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';

import { mapResponse } from '@ngrx/operators';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';

import { CursorDirection, initialPagination } from '@shared/types';

import { IncomesGraphQLService } from '../services/incomes-graphql.service';
import { incomesApiEvents, incomesPageEvents } from './incomes.events';

export function withIncomesEventHandlers() {
  return signalStoreFeature(
    withEventHandlers((_, events = inject(Events), api = inject(IncomesGraphQLService)) => {
      const loadIncomes$ = (pageSize: number, direction: CursorDirection, cursor: string | null) =>
        api.getAllWithPagination({ direction, cursor, pageSize }).pipe(
          mapResponse({
            next: (result) =>
              incomesApiEvents.loadedSuccess({
                incomes: result.incomes,
                totalCount: result.totalCount,
                pageInfo: result.pageInfo,
              }),
            error: (error: { message: string }) => incomesApiEvents.loadedFailure({ error: error.message }),
          }),
        );

      return {
        loadIncomes$: events.on(incomesPageEvents.opened).pipe(switchMap(() => loadIncomes$(initialPagination.rows, 'first', null))),

        navigatePage$: events
          .on(incomesPageEvents.navigatePage)
          .pipe(switchMap(({ payload }) => loadIncomes$(payload.pageSize, payload.direction, payload.cursor))),

        pageSizeChanged$: events.on(incomesPageEvents.pageSizeChanged).pipe(switchMap(({ payload }) => loadIncomes$(payload.rows, 'first', null))),

        logErrors$: events
          .on(incomesApiEvents.loadedFailure, incomesApiEvents.addedFailure, incomesApiEvents.updatedFailure, incomesApiEvents.removedFailure)
          .pipe(tap(({ payload }) => console.error('[Incomes API Error]', payload))),
      };
    }),
  );
}
