import { Scenario } from './Scenario';
import { NumberTerm, ListTerm } from './DealTerms';
import { PlayerViewpoint, NumberTermViewpoint, ListTermViewpoint } from './TermViewpoints';

const LicesncingFeeTerm = new NumberTerm('mln', 'Licesncing fee', true);
const RunsPerEpisodeTerm = new ListTerm(['4', '5', '6', '7', '8'], 'Runs Per Episode', true, '6');

const buyerViewpoint = new PlayerViewpoint(3, [
  new NumberTermViewpoint(LicesncingFeeTerm, false, 8.4, 1, null, 6.5),
  new ListTermViewpoint(
    RunsPerEpisodeTerm,
    new Map<string, number>([
      ['4', -1.6],
      ['5', -0.8],
      ['6', 0],
      ['7', 0.8],
      ['8', 1.6]
    ])
  )
]);

const sellerViewpoint = new PlayerViewpoint(3.5, [
  new NumberTermViewpoint(LicesncingFeeTerm, true, 0, 1, null, null),
  new ListTermViewpoint(
    RunsPerEpisodeTerm,
    new Map<string, number>([
      ['4', 0.5],
      ['5', 0.25],
      ['6', 0],
      ['7', -0.25],
      ['8', -0.5]
    ])
  )
]);

export const MomsDotCom = new Scenario(
  'MomsDotCom',
  'Shrot desc',
  'longdesc',
  2,
  [LicesncingFeeTerm, RunsPerEpisodeTerm],
  [buyerViewpoint, sellerViewpoint]
);
