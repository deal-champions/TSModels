import { ScenarioId } from "./Scenarios";
import { CollectionModel } from "./CollectionModel";

/**
 * The League object represent a League that the user can register to.
 */
export interface League extends CollectionModel {
  /** The registered users for this league. */
  registeredPlayerIds: string[];

  /** The title of this league, as should be shown in the Front End */
  title: string;

  /** The description of this league, as should be shown in the Front End */
  description: string | null;

  /** The total number of players required to play the scenario of this league */
  requiredPlayers: number;

  /** The Id of the scenario for this league. */
  scenarioId: ScenarioId;
}
