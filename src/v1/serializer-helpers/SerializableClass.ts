import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject('SerializableClass')
export class SerializableClass {
  /** Used for serialization, to know the type */
  @JsonProperty('$', String)
  private _type: string;

  constructor() {
    this._type = new.target.name;
  }
}
