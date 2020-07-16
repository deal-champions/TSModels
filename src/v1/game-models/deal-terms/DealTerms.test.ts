import _ from 'lodash';
import { ListTerm, NumberTerm, DealTerm } from './DealTerms';
import { JsonConvert, OperationMode } from 'json2typescript';
import { TypeStringToConstructorMap } from '../../serializer-helpers/TypeStringToConstructorMap';

describe('Serilzes correctly', () => {
  let jsonConvert: JsonConvert = new JsonConvert();
  jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

  test('ListTerm', () => {
    const original: DealTerm = new ListTerm({
      possibleValues: ['4', '5', '6', '7', '8'],
      userFriendlyName: 'Runs Per Episode',
      isRequired: true,
      intialValue: '6'
    });
    let serialized = jsonConvert.serialize(original);
    let desirialized = jsonConvert.deserializeObject(serialized, ListTerm as any) as ListTerm;
    expect(desirialized).toStrictEqual(original);
    expect(() => (desirialized.value = '10')).toThrowError(TypeError);
  });

  test('NumberTerm', () => {
    jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

    const original = new NumberTerm({
      denomination: 'mln',
      userFriendlyName: 'Licesncing fee',
      isRequired: true
    });
    let serialized = jsonConvert.serialize(original);
    let desirialized: DealTerm = jsonConvert.deserializeObject(
      serialized,
      TypeStringToConstructorMap[serialized['$']] as any
    );
    expect(desirialized.constructor.name).toStrictEqual('NumberTerm');
  });
});

describe('Initilize correctly', () => {
  test('A term is initialized with default values', () => {
    const n = new NumberTerm();
    expect(n.denomination).toEqual('');
    expect(n.value).toEqual(null);
    expect(n.isRequired).toEqual(false);
    expect(n.userFriendlyName).toEqual('');
  });
});
