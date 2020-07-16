import _ from 'lodash';
import { ListTerm, NumberTerm, DealTerm } from '../deal-terms/DealTerms';
import { ListTermViewpoint, TermViewpoint, NumberTermViewpoint } from './TermViewpoints';
import { JsonConvert, OperationMode } from 'json2typescript';
import { TypeStringToConstructorMap } from '../../serializer-helpers/TypeStringToConstructorMap';

describe('Serilzes correctly', () => {
  let jsonConvert: JsonConvert = new JsonConvert();
  jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

  test.only('ListTermViewpoint', () => {
    const RunsPerEpisodeTerm = new ListTerm({
      possibleValues: ['4', '5', '6', '7', '8'],
      userFriendlyName: 'Runs Per Episode',
      isRequired: true,
      intialValue: '6'
    });

    const original: TermViewpoint = new ListTermViewpoint({
      dealTerm: RunsPerEpisodeTerm,
      valueToPointsMap: {
        '4': -1.6,
        '5': -0.8,
        '6': 0,
        '7': 0.8,
        '8': 1.6
      }
    });

    // let serialized = jsonConvert.serialize(original);
    // let desirialized: TermViewpoint = jsonConvert.deserializeObject(
    //   serialized,
    //   TypeStringToConstructorMap[serialized['$']] as any
    // );

    // expect(desirialized.points).toEqual(1.6);
  });
});
