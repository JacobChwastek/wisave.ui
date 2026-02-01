import { withDevtools, withGlitchTracking, withTrackedReducer } from '@angular-architects/ngrx-toolkit';
import { IIncome } from '@features/incomes/types/incomes.interfaces';
import { signalStore, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { on } from '@ngrx/signals/events';

import { withIncomesEventHandlers } from './incomes.event-handlers';
import { incomesApiEvents, incomesPageEvents } from './incomes.events';
import { initialFilter, initialState } from './incomes.state';

export const IncomesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Incomes', withGlitchTracking()),
  withState(initialState),
  withEntities<IIncome>(),
  withTrackedReducer(
    on(incomesPageEvents.opened, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.navigatePage, ({ payload }, state) => {
      const currentPage = state.pagination.currentPage;
      const newPage =
        payload.direction === 'next' ? currentPage + 1 : payload.direction === 'previous' ? Math.max(1, currentPage - 1) : 1;

      return {
        isLoading: true,
        error: null,
        pagination: {
          ...state.pagination,
          currentPage: newPage,
        },
      };
    }),
    on(incomesPageEvents.pageSizeChanged, ({ payload }, state) => ({
      isLoading: true,
      error: null,
      pagination: {
        ...state.pagination,
        rows: payload.rows,
        currentPage: 1,
      },
    })),
    on(incomesPageEvents.add, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.update, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.remove, () => ({ isLoading: true, error: null })),
    on(incomesPageEvents.filterApplied, ({ payload }, state) => ({
      isLoading: true,
      error: null,
      filter: {
        ...state.filter,
        ...payload.filter,
      },
      pagination: {
        ...state.pagination,
        currentPage: 1,
      },
    })),
    on(incomesPageEvents.filtersCleared, (_, state) => ({
      isLoading: true,
      error: null,
      filter: initialFilter,
      pagination: {
        ...state.pagination,
        currentPage: 1,
      },
    })),
    on(incomesPageEvents.sortChanged, ({ payload }, state) => ({
      isLoading: true,
      error: null,
      sort: payload.sort,
      pagination: {
        ...state.pagination,
        currentPage: 1,
      },
    })),

    on(incomesApiEvents.loadedSuccess, ({ payload }, state) => [
      setAllEntities<IIncome>(payload.incomes),
      () => ({
        isLoading: false,
        error: null,
        pagination: {
          ...state.pagination,
          totalRecords: payload.totalCount,
          pageInfo: payload.pageInfo,
        },
      }),
    ]),
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

    // Categories
    on(incomesApiEvents.categoriesLoadedSuccess, ({ payload }) => ({
      availableCategories: payload.categories,
      categoriesLoading: false,
    })),
    on(incomesApiEvents.categoriesLoadedFailure, () => ({
      categoriesLoading: false,
    })),
  ),
  withIncomesEventHandlers(),
);
