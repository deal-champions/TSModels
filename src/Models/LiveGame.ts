import { Offer } from "./Offer";
import { ScenarioId } from "./Scenarios";
import { CollectionModel } from "./CollectionModel";

export enum LiveGameStatus {
  /** The game is live and being played */
  LIVE,
  /** The game has finished with a deal agreed */
  DEAL,
  /** The game has finished with no deal agreed  */
  NO_DEAL,
  /** The game has finished because of time out.  */
  TIMEOUT,
}

/**  */
export interface LiveGame extends CollectionModel {
  /** The userIds of the players in this game.  */
  playerIds: string[];

  /** The current status of the game. */
  status: LiveGameStatus;

  /** A history of offers that have been submitted, excluding the activeOffer */
  previousOffers: Offer[];

  /** The scenario for this game */
  scenarioId: ScenarioId;

  /** The currently active offer, which is under consideration - it can be accepeted or withdrawn. */
  activeOffer: Offer;
}
