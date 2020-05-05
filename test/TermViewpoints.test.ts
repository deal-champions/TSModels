import _ from 'lodash';
import { ListTerm, NumberTerm, DealTerm } from '../src/DealTerms';
import { ListTermViewpoint, TermViewpoint } from '../src/TermViewpoints';
import { JsonConvert, OperationMode } from 'json2typescript';
import { typeConstructorMap } from '../src/serializer-helpers';

describe('Serilzes correctly', () => {
  let jsonConvert: JsonConvert = new JsonConvert();
  jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

  test.only('ListTermViewpoint', () => {
    const RunsPerEpisodeTerm = new ListTerm(
      ['4', '5', '6', '7', '8'],
      'Runs Per Episode',
      true,
      '8'
    );

    const original: TermViewpoint = new ListTermViewpoint(
      RunsPerEpisodeTerm,
      new Map<string, number>([
        ['4', -1.6],
        ['5', -0.8],
        ['6', 0],
        ['7', 0.8],
        ['8', 1.6]
      ])
    );

    jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data

    let serialized = jsonConvert.serialize(original);
    let desirialized: TermViewpoint = jsonConvert.deserializeObject(
      serialized,
      typeConstructorMap[serialized['$']] as any
    );
    expect(desirialized.points).toEqual(1.6);
  });
});
