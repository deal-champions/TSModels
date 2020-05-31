import { JsonObject, JsonProperty } from 'json2typescript';
import { SerializableClass } from '../../serializer-helpers/SerializableClass';
import { Logger } from '../../logger';

export interface DealTerm<T = number | string> {
  /** The actual value of the term. */
  value: T | null;

  /**
   * A user firendly name of the term, which will be shown to the user
   */
  userFriendlyName: string;

  /**
   * If the term is required before a Scenario can be completed/agreed upon.
   * If false, then even if no decision is agreed, the negotiation can still complete
   */
  isRequired: boolean;
}

@JsonObject('NumberTerm')
export class NumberTerm extends SerializableClass implements DealTerm<number> {
  /** The denomiation of the number - e.g. "million $", "km", "$", etc. */
  @JsonProperty('denomination', String)
  public denomination: string;

  @JsonProperty('userFriendlyName')
  public userFriendlyName: string;

  @JsonProperty('isRequired')
  public isRequired: boolean;

  @JsonProperty('value')
  public value: number;

  constructor(opts?: {
    denomination: string;
    userFriendlyName: string;
    isRequired: boolean;
    intialValue?: number;
  }) {
    super();
    if (!opts) {
      Logger.warnUninitializedClass();
      this.denomination = null!;
      this.isRequired = null!;
      this.userFriendlyName = null!;
      this.value = null!;
      return;
    }
    this.denomination = opts.denomination;
    this.userFriendlyName = opts.userFriendlyName;
    this.isRequired = opts.isRequired;
    this.value = opts.intialValue || 0;
  }
}

@JsonObject('ListTerm')
export class ListTerm extends SerializableClass implements DealTerm<string> {
  /** Exaustive list of all possible values for this term */
  @JsonProperty('possibleValues')
  readonly possibleValues: string[];

  @JsonProperty('userFriendlyName')
  public userFriendlyName: string;

  @JsonProperty('isRequired')
  public isRequired: boolean;

  @JsonProperty('value')
  private _value: string | null = null;
  get value() {
    return this._value;
  }

  set value(newVal: string | null) {
    if (newVal && this.possibleValues && this.possibleValues.indexOf(newVal) < 0) {
      throw new TypeError(`value must be one of ${this.possibleValues} but it was ${newVal}`);
    }
    this._value = newVal;
  }
  constructor(opts?: {
    possibleValues: string[];
    userFriendlyName: string;
    isRequired: boolean;
    intialValue: string | null;
  }) {
    super();
    if (!opts) {
      Logger.warnUninitializedClass();
      this.possibleValues = null!;
      this.isRequired = null!;
      this.userFriendlyName = null!;
      return;
    }
    this.possibleValues = opts.possibleValues;
    this.userFriendlyName = opts.userFriendlyName;
    this.isRequired = opts.isRequired;
    this.value = opts.intialValue;
  }
}
