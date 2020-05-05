import _ from 'lodash';
import { ListTerm, NumberTerm, DealTerm } from '../src/DealTerms';
import { JsonConvert, OperationMode } from 'json2typescript';
import { typeConstructorMap } from '../src/serializer-helpers';

describe('Serilzes correctly', () => {
  let jsonConvert: JsonConvert = new JsonConvert();
  jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

  test('ListTerm', () => {
    const original: DealTerm = new ListTerm(
      ['4', '5', '6', '7', '8'],
      'Runs Per Episode',
      true,
      '6'
    );
    let serialized = jsonConvert.serialize(original);
    let desirialized = jsonConvert.deserializeObject(serialized, ListTerm as any) as ListTerm;
    expect(desirialized).toStrictEqual(original);
    expect(() => (desirialized.value = '10')).toThrowError(TypeError);
  });

  test('NumberTerm', () => {
    jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

    const original = new NumberTerm('mln', 'Licesncing fee', true);
    let serialized = jsonConvert.serialize(original);
    let desirialized: DealTerm = jsonConvert.deserializeObject(
      serialized,
      typeConstructorMap[serialized['$']] as any
    );
    expect(desirialized.constructor.name).toStrictEqual('NumberTerm');
  });
});
