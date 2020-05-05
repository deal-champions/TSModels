import { DealTerm } from './DealTerms';
import { PlayerViewpoint } from './TermViewpoints';

export class Scenario {
  constructor(
    /** The main name of the scenario */
    public title: string,

    /** A short description max 2 senteces. ?? MAYBE max x chars? To be shown below the title */
    public shortDescription: string,

    public longDescription: string,

    /** The required participants to start this scenario */
    public requiredParticipants: number,

    /** All the terms that could be negotiated */
    public termsToNegotiate: DealTerm[],

    public playerViewpoints: PlayerViewpoint[]
  ) {}
}
