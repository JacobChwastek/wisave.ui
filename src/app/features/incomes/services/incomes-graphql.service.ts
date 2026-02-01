import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GraphQLService } from '@graphql/services/graphql.service';
import { CursorDirection } from '@shared/types';

import {
  GetCategoriesDocument,
  GetIncomeByIdDocument,
  GetIncomesDocument,
  GetTotalAmountDocument,
  type GetCategoriesQuery,
  type GetIncomeByIdQuery,
  type GetIncomeByIdQueryVariables,
  type GetIncomesQuery,
  type GetIncomesQueryVariables,
  type GetTotalAmountQuery,
  type GetTotalAmountQueryVariables,
} from '../graphql/incomes.queries.generated';
import type { IIncome } from '../types/incomes.interfaces';
import { IncomesMapperService } from './incomes-mapper.service';

export interface IIncomesQueryResult {
  incomes: IIncome[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
}

export interface ICursorPaginationParams {
  direction: CursorDirection;
  cursor: string | null;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class IncomesGraphQLService {
  #graphql = inject(GraphQLService);
  #mapper = inject(IncomesMapperService);

  getAll(variables?: GetIncomesQueryVariables): Observable<IIncome[]> {
    return this.#graphql.query<GetIncomesQuery, GetIncomesQueryVariables>(GetIncomesDocument, variables).pipe(
      map((data) => {
        const nodes = data.incomes?.nodes ?? [];
        return this.#mapper.mapToIncomes(nodes);
      }),
    );
  }

  getAllWithPagination(params: ICursorPaginationParams): Observable<IIncomesQueryResult> {
    const variables = this.#buildPaginationVariables(params);

    return this.#graphql.query<GetIncomesQuery, GetIncomesQueryVariables>(GetIncomesDocument, variables).pipe(
      map((data) => {
        const nodes = data.incomes?.nodes ?? [];
        return {
          incomes: this.#mapper.mapToIncomes(nodes),
          totalCount: data.incomes?.totalCount ?? 0,
          pageInfo: {
            hasNextPage: data.incomes?.pageInfo.hasNextPage ?? false,
            hasPreviousPage: data.incomes?.pageInfo.hasPreviousPage ?? false,
            startCursor: data.incomes?.pageInfo.startCursor ?? null,
            endCursor: data.incomes?.pageInfo.endCursor ?? null,
          },
        };
      }),
    );
  }

  #buildPaginationVariables(params: ICursorPaginationParams): GetIncomesQueryVariables {
    const { direction, cursor, pageSize } = params;

    if (direction === 'previous' && cursor) {
      return { last: pageSize, before: cursor };
    }

    if (direction === 'next' && cursor) {
      return { first: pageSize, after: cursor };
    }

    return { first: pageSize };
  }

  getById(id: string): Observable<IIncome | null> {
    return this.#graphql
      .query<GetIncomeByIdQuery, GetIncomeByIdQueryVariables>(GetIncomeByIdDocument, { id })
      .pipe(map((data) => (data.incomeById ? this.#mapper.mapToIncome(data.incomeById) : null)));
  }

  getTotalAmount(currency?: string): Observable<number> {
    return this.#graphql.query<GetTotalAmountQuery, GetTotalAmountQueryVariables>(GetTotalAmountDocument, { currency }).pipe(map((data) => data.totalAmount));
  }

  getCategories(): Observable<string[]> {
    return this.#graphql.query<GetCategoriesQuery, Record<string, never>>(GetCategoriesDocument).pipe(map((data) => data.categories));
  }
}
