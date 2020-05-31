import { ListTerm, NumberTerm } from '../game-models/deal-terms/DealTerms';
import {
  ListTermViewpoint,
  NumberTermViewpoint
} from '../game-models/term-viewpoints/TermViewpoints';
import { PlayerViewpoint } from '../game-models/PlayerViewpoint';
import { Scenario } from '../game-models/Scenario';
import { Player } from '../game-models/Player';

export const TypeStringToConstructorMap = {
  [NumberTerm.name]: NumberTerm,
  [ListTerm.name]: ListTerm,
  [NumberTermViewpoint.name]: NumberTermViewpoint,
  [ListTermViewpoint.name]: ListTermViewpoint,
  [PlayerViewpoint.name]: PlayerViewpoint,
  [Scenario.name]: Scenario,
  [Player.name]: Player
};
