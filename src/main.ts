import { MomsDotCom } from './momscom';
import { ListTerm } from './DealTerms';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

const RunsPerEpisodeTerm = new ListTerm(['4', '5', '6', '7', '8'], 'Runs Per Episode', true, '6');

// Choose your settings
// Check the detailed reference in the chapter "JsonConvert class properties and methods"
let jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

// Map to the country class
let newRuns: ListTerm;
try {
  let jo = jsonConvert.serialize(RunsPerEpisodeTerm);
  newRuns = jsonConvert.deserializeObject(jo, ListTerm as any);
  newRuns.value = '9';

  console.log(newRuns.value);
} catch (e) {
  console.log(e);
}
