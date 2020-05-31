import { DealTerm } from '../game-models/deal-terms/DealTerms';

export interface OfferTerm {
  /** The name of the deal term, that this offerterm is refering to */
  dealTermName: string;
  /** The offered value of the deal term. */
  vlaue: string | number;
}

export interface Offer {
  offerrerId: string;
  offerTerms: OfferTerm[];
}
