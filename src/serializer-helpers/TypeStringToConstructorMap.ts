import { ListTerm, NumberTerm } from '../models/deal-terms/DealTerms';
import { ListTermViewpoint, NumberTermViewpoint } from '../models/term-viewpoints/TermViewpoints';
import { PlayerViewpoint } from '../models/PlayerViewpoint';
import { Scenario } from '../models/Scenario';
import { Player } from '../models/Player';

export const TypeStringToConstructorMap = {
  [NumberTerm.name]: NumberTerm,
  [ListTerm.name]: ListTerm,
  [NumberTermViewpoint.name]: NumberTermViewpoint,
  [ListTermViewpoint.name]: ListTermViewpoint,
  [PlayerViewpoint.name]: PlayerViewpoint,
  [Scenario.name]: Scenario,
  [Player.name]: Player
};
