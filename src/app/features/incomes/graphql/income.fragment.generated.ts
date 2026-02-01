/* eslint-disable */
import { gql } from 'apollo-angular';

export type IncomeFieldsFragment = {
  __typename?: 'IncomeDocument';
  id: string;
  date: string;
  description: string;
  categories: Array<string>;
  amount: number;
  currency: string;
  recurring: boolean;
  createdAt: string;
  updatedAt?: string | null;
};

export const IncomeFieldsFragmentDoc = gql`
  fragment IncomeFields on IncomeDocument {
    id
    date
    description
    categories
    amount
    currency
    recurring
    createdAt
    updatedAt
  }
`;
