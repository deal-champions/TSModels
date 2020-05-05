import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('DealTerm')
export abstract class DealTerm<T = number | string> {
  @JsonProperty('value')
  protected _value: T | null = null;
  /** The actual value of the term. */
  get value(): T | null {
    return this._value;
  }
  set value(newVal: T | null) {
    this._value = newVal;
  }
  /**
   * A user firendly name of the term, which will be shown to the user
   */
  @JsonProperty('userFriendlyName', String)
  public userFriendlyName: string;
  /**
   * If the term is required before a Scenario can be completed/agreed upon.
   * If false, then even if no decision is agreed, the negotiation can still complete
   */
  @JsonProperty('isRequired', Boolean)
  public isRequired: boolean;

  /** Used for serialization, to know the type */
  @JsonProperty('$', String)
  private _type: string;

  constructor(userFriendlyName: string = '', isRequired: boolean = false, value: T | null = null) {
    this.userFriendlyName = userFriendlyName;
    this.isRequired = isRequired;
    this.value = value;
    this._type = new.target.name;
  }
}
@JsonObject('NumberTerm')
export class NumberTerm extends DealTerm<number> {
  /** The denomiation of the number - e.g. "million $", "km", "$", etc. */
  @JsonProperty('denomination', String)
  public denomination: string = '';

  constructor(
    denomination?: string,
    userFriendlyName?: string,
    isRequired?: boolean,
    value?: number | null
  ) {
    super(userFriendlyName, isRequired, value);
    this.denomination = denomination || this.denomination;
  }
}

@JsonObject('ListTerm')
export class ListTerm extends DealTerm<string> {
  /** Exaustive list of all possible values for this term */
  @JsonProperty('possibleValues')
  readonly possibleValues: string[] = [];

  constructor(
    possibleValues?: string[],
    userFriendlyName?: string,
    isRequired?: boolean,
    value?: string | null
  ) {
    super(userFriendlyName, isRequired, value);
    this.possibleValues = possibleValues || this.possibleValues;
  }

  set value(newVal: string | null) {
    if (newVal && this.possibleValues && this.possibleValues.indexOf(newVal) < 0) {
      throw new TypeError(`value must be one of ${this.possibleValues} but it was ${newVal}`);
    }
    this._value = newVal;
  }
}

/**
 * This is a DealTerm that consists of many child dealterms.
 * It's value is an array of the values of all the dealterms
 */
@JsonObject('ComplexTerm')
export class ComplexTerm extends DealTerm<(string | number | null)[]> {
  /** List of all the child dealterms */
  @JsonProperty('terms')
  readonly terms: (NumberTerm | ListTerm)[] = [];

  constructor(terms?: (NumberTerm | ListTerm)[], userFriendlyName?: string, isRequired?: boolean) {
    super(userFriendlyName, isRequired);
    this.terms = terms || this.terms;
  }

  /** A List of all the values of the child dealterms. */
  get value(): (string | number | null)[] {
    return this.terms.map(t => t.value);
  }
}
