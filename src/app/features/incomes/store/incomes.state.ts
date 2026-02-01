import { initialPagination, type IPagination } from '@shared/types';

export interface IDateRangeFilter {
  from: Date | null;
  to: Date | null;
}

export interface IIncomesFilter {
  dateRange: IDateRangeFilter;
  searchQuery: string;
  categories: string[];
  recurring: boolean | null;
}

export interface IIncomesSortOrder {
  field: 'date' | 'amount' | 'description' | 'createdAt';
  direction: 'asc' | 'desc';
}

export interface IncomesState {
  isLoading: boolean;
  error: string | null;
  filter: IIncomesFilter;
  sort: IIncomesSortOrder;
  pagination: IPagination;
  availableCategories: string[];
  categoriesLoading: boolean;
}

export const initialFilter: IIncomesFilter = {
  dateRange: { from: null, to: null },
  searchQuery: '',
  categories: [],
  recurring: null,
};

export const initialSort: IIncomesSortOrder = {
  field: 'date',
  direction: 'desc',
};

export const initialState: IncomesState = {
  isLoading: false,
  error: null,
  filter: initialFilter,
  sort: initialSort,
  pagination: initialPagination,
  availableCategories: [],
  categoriesLoading: false,
};
