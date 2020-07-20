import { Offer } from './Offer';
import { ScenarioId } from './Scenarios';

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

/**  */
export interface LiveGame {
  /** The userIds of the players in this game.  */
  playerIds: string[];

  /** The current status of the game. */
  status: LiveGameStatus;

  /** All the offers that have been submitted in this Game. Only the latest one can be active */
  offers: Offer[];

  /** The scenario for this game */
  scenarioId: keyof typeof ScenarioId;
}
