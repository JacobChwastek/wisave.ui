import { initialPagination, type IPagination } from '@shared/types';

export interface IncomesFilter {
  query: string;
  order: 'asc' | 'desc';
}

export interface IncomesState {
  isLoading: boolean;
  error: string | null;
  filter: IncomesFilter;
  pagination: IPagination;
}

export const initialState: IncomesState = {
  isLoading: false,
  error: null,
  filter: { query: '', order: 'asc' },
  pagination: initialPagination,
};
