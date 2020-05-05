import { DealTerm, ComplexTerm, ListTerm, NumberTerm } from './DealTerms';
import { ListTermViewpoint, NumberTermViewpoint, TermViewpoint } from './TermViewpoints';

export const typeConstructorMap = {
  [NumberTerm.name]: NumberTerm,
  [ListTerm.name]: ListTerm,
  [ComplexTerm.name]: ComplexTerm,
  [DealTerm.name]: DealTerm,
  [ListTermViewpoint.name]: ListTermViewpoint,
  [NumberTermViewpoint.name]: NumberTermViewpoint,
  [TermViewpoint.name]: TermViewpoint
};
