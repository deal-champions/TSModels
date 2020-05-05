import { SerializableClass } from './SerializableClass';
import { JsonConvert, OperationMode } from 'json2typescript';
import { TypeStringToConstructorMap } from './TypeStringToConstructorMap';

const jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

/**
 * This function can take a SerializableClass and serialize it to a JSON Object, which is just a plain JS object
 */
export function serializeToJsonObject(obj: SerializableClass): any {
  return jsonConvert.serialize(obj);
}

/**
 * This function will serialize `SerializableClass` to a JSON string;
 */
export function serializeToJsonString(obj: SerializableClass): any {
  return JSON.stringify(serializeToJsonObject(obj));
}

/**
 * This funciton will desirialize a JsonObject to the correct `SerializableClass` instance.
 * @param jsonObject The parsed JSON object. Should be a serialized object of type `SerializableClass`,
 * as it expects to find a field `'$'` with the string of a registerd type (e.g. `"$": "ListTerm").
 * Registerted types live in the `TypeStringToConstructorMap`.
 */
export function desirializeObject<T extends SerializableClass = SerializableClass>(
  jsonObject: any
): T {
  return jsonConvert.deserializeObject(
    jsonObject,
    TypeStringToConstructorMap[jsonObject['$']] as any
  ) as T;
}

/**
 * This is a helper function, which will directly desirialize a `SerializableClass` from a json string.
 * @param jsonString
 */
export function desirializeString<T extends SerializableClass = SerializableClass>(
  jsonString: string
): T {
  return desirializeObject<T>(JSON.parse(jsonString));
}

export const enableSerilizerLogging = () => (jsonConvert.operationMode = OperationMode.LOGGING);
export const disableSerilizerLogging = () => (jsonConvert.operationMode = OperationMode.ENABLE);
