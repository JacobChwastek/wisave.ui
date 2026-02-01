import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

import { IIncome } from '@features/incomes/types/incomes.interfaces';

import { mockIncomes } from '../store/incomes.state';

@Injectable({ providedIn: 'root' })
export class IncomesApiService {
  private readonly SIMULATED_DELAY = 300;

  getAll(): Observable<IIncome[]> {
    // TODO: Replace with real HTTP call
    // return this.http.get<IIncome[]>('/api/incomes');
    return of(mockIncomes).pipe(delay(this.SIMULATED_DELAY));
  }

  create(income: Omit<IIncome, 'id'>): Observable<IIncome> {
    // TODO: Replace with real HTTP call
    // return this.http.post<IIncome>('/api/incomes', income);
    const newIncome: IIncome = { ...income, id: crypto.randomUUID() };
    return of(newIncome).pipe(delay(this.SIMULATED_DELAY));
  }

  update(id: string, changes: Partial<IIncome>): Observable<IIncome> {
    // TODO: Replace with real HTTP call
    // return this.http.patch<IIncome>(`/api/incomes/${id}`, changes);
    const updated = { id, ...changes } as IIncome;
    return of(updated).pipe(delay(this.SIMULATED_DELAY));
  }

  delete(id: string): Observable<void> {
    // TODO: Replace with real HTTP call
    // return this.http.delete<void>(`/api/incomes/${id}`);
    return of(undefined).pipe(delay(this.SIMULATED_DELAY));
  }
}
