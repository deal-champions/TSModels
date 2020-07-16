import { PlayerViewpoint } from '../game-models/PlayerViewpoint';

export interface BasePlayerViewpoint {
  /** The ID for this Viewpoint. Usually `Sceanrio.Name`_`PlayerViewpoint.name` */
  docId: string;

  viewpoint: PlayerViewpoint;
}
