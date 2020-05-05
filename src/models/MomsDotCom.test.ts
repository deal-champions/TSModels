import { PlayerViewpoint } from './PlayerViewpoint';
import { NumberTerm, ListTerm } from './deal-terms/DealTerms';
import { Scenario } from './Scenario';
import { NumberTermViewpoint, ListTermViewpoint } from './term-viewpoints/TermViewpoints';
import { Player } from './Player';
import { JsonConvert, OperationMode } from 'json2typescript';
import {
  serializeToJsonString,
  desirializeString,
  serializeToJsonObject,
  desirializeObject,
  enableSerilizerLogging
} from '../serializer-helpers/JsonSerializer';

const LicesncingFeeTerm = new NumberTerm({
  denomination: 'mln',
  userFriendlyName: 'Licesncing fee',
  isRequired: true
});
const Juniors = new NumberTerm({
  denomination: 'mln',
  userFriendlyName: 'Juniors',
  isRequired: false
});
const RunsPerEpisodeTerm = new ListTerm({
  possibleValues: ['4', '5', '6', '7', '8'],
  userFriendlyName: 'Runs Per Episode',
  isRequired: true,
  intialValue: '6'
});

const MomsDotCom = new Scenario({
  title: 'MomsDotCom',
  requiredParticipants: 2,
  termsToNegotiate: [LicesncingFeeTerm, RunsPerEpisodeTerm]
});

const buyerViewpoint = new PlayerViewpoint({
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

const sellerViewpoint = new PlayerViewpoint({
  batna: 3.5,
  termsViewpoints: [
    // new NumberTermViewpoint(LicesncingFeeTerm, true, 0),
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

const Buyer = new Player('Buyer', buyerViewpoint);
const Seller = new Player('Seller', sellerViewpoint);

describe.only('Moms.Com case', () => {
  test('de/serilizes correctly', () => {
    let serializedBuyer = serializeToJsonString(Buyer);
    let desirializedBuyer = desirializeString(serializedBuyer);
    expect(desirializedBuyer).toStrictEqual(Buyer);

    let serializedSeller = serializeToJsonString(Seller);
    let desirializedSeller = desirializeString(serializedSeller);
    expect(desirializedSeller).toStrictEqual(Seller);
  });
});
