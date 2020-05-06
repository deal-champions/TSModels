import { NumberTerm, ListTerm } from '../models/deal-terms/DealTerms';
import { Scenario } from '../models/Scenario';
import { PlayerViewpoint } from '../models/PlayerViewpoint';
import { NumberTermViewpoint, ListTermViewpoint } from '../models/term-viewpoints/TermViewpoints';

export const LicesncingFeeTerm = new NumberTerm({
  denomination: 'mln',
  userFriendlyName: 'Licesncing fee',
  isRequired: true
});
export const Juniors = new NumberTerm({
  denomination: 'mln',
  userFriendlyName: 'Juniors',
  isRequired: false
});
export const RunsPerEpisodeTerm = new ListTerm({
  possibleValues: ['4', '5', '6', '7', '8'],
  userFriendlyName: 'Runs Per Episode',
  isRequired: true,
  intialValue: '6'
});

export const MomsDotCom = new Scenario({
  title: 'MomsDotCom',
  requiredParticipants: 2,
  termsToNegotiate: [LicesncingFeeTerm, RunsPerEpisodeTerm]
});

export const buyerViewpoint = new PlayerViewpoint({
  batna: 3,
  termsViewpoints: [
    new NumberTermViewpoint({
      dealTerm: LicesncingFeeTerm,
      higherIsBetter: false,
      maxAcceptableValue: 6.5,
      referencePoint: 8.4
    }),
    new NumberTermViewpoint({
      dealTerm: Juniors,
      higherIsBetter: false,
      referencePoint: 2
    }),
    new ListTermViewpoint({
      dealTerm: RunsPerEpisodeTerm,
      valueToPointsMap: {
        '4': -1.6,
        '5': -0.8,
        '6': 0,
        '7': 0.8,
        '8': 1.6
      }
    })
  ],
  scenario: MomsDotCom
});

export const sellerViewpoint = new PlayerViewpoint({
  batna: 3.5,
  termsViewpoints: [
    new NumberTermViewpoint({
      dealTerm: LicesncingFeeTerm,
      higherIsBetter: true,
      referencePoint: 0
    }),
    new NumberTermViewpoint({ dealTerm: Juniors, referencePoint: 1, higherIsBetter: true }),
    new ListTermViewpoint({
      dealTerm: RunsPerEpisodeTerm,
      valueToPointsMap: {
        '4': -1.6,
        '5': -0.8,
        '6': 0,
        '7': 0.8,
        '8': 1.6
      }
    })
  ],
  scenario: MomsDotCom
});
