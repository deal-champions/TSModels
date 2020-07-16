import { GamePlayer } from './GamePlayer';
import { Offer } from './Offer';

export enum LiveGameStatus {
  /** The game is live and being played */
  LIVE,
  /** The game has finished with a deal agreed */
  DEAL,
  /** The game has finished with no deal agreed  */
  NO_DEAL,
  /** The game has finished because of time out.  */
  TIMEOUT
}

export interface LiveGame {
  players: GamePlayer[];
  // tsStarted: FirebaseFirestore.Timestamp;
  // tsFinished?: FirebaseFirestore.Timestamp;
  status: LiveGameStatus;
  latestdOffer?: Offer;
}
