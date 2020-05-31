import { DBRef } from './helpers';
import { PlayerViewpoint } from '../game-models/PlayerViewpoint';

export interface GamePlayer {
  userId: string;
  /**
   * The viewpoint for this player in this game. This is a copy and not a ref because
   * we want to keep this in the history, even if the BasePlayerViewpoint changes.
   */
  viewpoint: PlayerViewpoint;
  /**
   * The points from 0 to 100 that this player got in the end of the game.
   * As a percentage of the max possible points he could have got.
   */
  leaguePoints?: number;
}
