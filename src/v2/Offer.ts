/** The offers that players submit to each other during the game */
export interface Offer {
  /** The UserId of the offerer. */
  offerrerId: string;

  /** A map representing the values of the terms. The backend will NOT do any validation here. */
  terms: {
    /** The termId is used to identify which term this value is for. */
    [termId: string]: number | string | null;
  };

  /** If the offer has been withdrawn. */
  withdrawn: boolean;
}
