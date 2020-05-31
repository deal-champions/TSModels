import { DealTerm, NumberTerm, ListTerm } from '../deal-terms/DealTerms';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Logger } from '../../logger';
import { SerializableClass } from '../../serializer-helpers/SerializableClass';

/** A constant represnting a NO DEAL for a Negotiation Position. */
export const NO_DEAL = Number.POSITIVE_INFINITY;
/**
 * This is the viewpoint that a player can take in a negotiation - e.g. buyer, seller, etc.
 * It describes how the different values of the [DealTerm]s affect this player's points
 * E.g. what is acceptable and what is not, what deal terms give you more points, how much etc.
 */

export interface TermViewpoint<T extends DealTerm = DealTerm> {
  /** The current value of points for this Term. It may return `noDeal` if the value is out of bounds. */
  points: number;

  /** The DealTerm for this TermViewpoint */
  dealTerm: T | null;
}

@JsonObject('NumberTermViewpoint')
export class NumberTermViewpoint extends SerializableClass implements TermViewpoint<NumberTerm> {
  /** If true - higher value is better. If false - lower value is better */
  @JsonProperty('higherIsBetter', Boolean)
  public higherIsBetter: boolean;

  /**
   * This is the reference point for the caluclation of the value of this term. It can be 0.
   * For example, the reference point may depend on some sort of analysis or something else.
   */
  @JsonProperty('referencePoint', Number)
  public referencePoint: number;

  /** The multiplier for each point in the vlaue of the term. */
  @JsonProperty('multiplier', Number)
  public multiplier: number;

  /** The min value of the term if any. Anything below this will result in NO-DEAL */
  @JsonProperty('minAcceptableValue', Number, true)
  public minAcceptableValue?: number;

  /** The max value of the term if any. Anything above this will result in NO-DEAL */
  @JsonProperty('maxAcceptableValue', Number, true)
  public maxAcceptableValue?: number;

  @JsonProperty('dealTerm', NumberTerm)
  dealTerm: NumberTerm;

  constructor(
    opts: {
      dealTerm?: NumberTerm;
      higherIsBetter?: boolean;
      referencePoint?: number;
      multiplier?: number;
      minAcceptableValue?: number;
      maxAcceptableValue?: number;
    } = {}
  ) {
    super();
    if (!opts.dealTerm) {
      Logger.warnUninitializedClass();
    }
    this.dealTerm = opts.dealTerm || null!;
    this.higherIsBetter = opts.higherIsBetter || true;
    this.referencePoint = opts.referencePoint || 0;
    this.multiplier = opts.multiplier || 1;
    this.minAcceptableValue = opts.minAcceptableValue;
    this.maxAcceptableValue = opts.maxAcceptableValue;
  }

  get points(): number {
    if (!this.dealTerm || !this.dealTerm.value) {
      return 0;
    }
    if (this.minAcceptableValue != null && this.dealTerm.value < this.minAcceptableValue) {
      return NO_DEAL;
    }
    if (this.maxAcceptableValue != null && this.dealTerm.value > this.maxAcceptableValue) {
      return NO_DEAL;
    }
    if (this.higherIsBetter) {
      return (this.dealTerm.value - this.referencePoint) * this.multiplier;
    } else {
      return (this.referencePoint - this.dealTerm.value) * this.multiplier;
    }
  }
}
@JsonObject('ListTermViewpoint')
export class ListTermViewpoint extends SerializableClass implements TermViewpoint<ListTerm> {
  /** A mapping between the possible values of the ListTerm and the points */
  @JsonProperty('valueToPointsMap')
  readonly valueToPointsMap: { [k: string]: number };

  @JsonProperty('dealTerm', ListTerm)
  dealTerm: ListTerm | null;

  get points(): number {
    if (!this.dealTerm || !this.valueToPointsMap) {
      return 0;
    }
    // We have guaranteed that there will be always be a points value for each possible value
    return this.valueToPointsMap[this.dealTerm.value as string]!;
  }

  constructor(opts?: { dealTerm: ListTerm; valueToPointsMap: { [k: string]: number } }) {
    super();
    if (!opts) {
      Logger.warnUninitializedClass();
      this.dealTerm = null!;
      this.valueToPointsMap = null!;
      return;
    }

    // Guarantee that there is a point value for each possibel value
    const vpmKeys = Object.getOwnPropertyNames(opts.valueToPointsMap);
    let invalidKey = vpmKeys.find(k => opts.dealTerm.possibleValues.indexOf(k) < 0);

    if (invalidKey != null) {
      throw TypeError(
        `All keys must be one of ${opts.dealTerm.possibleValues}. "${invalidKey}" provided`
      );
    }

    if (vpmKeys.length !== opts.dealTerm.possibleValues.length) {
      throw TypeError(
        `You need to specify values for all possible keys: ${opts.dealTerm.possibleValues}.` +
          `You have missed: ${opts.dealTerm.possibleValues.filter(v => vpmKeys.indexOf(v) < 0)}`
      );
    }

    this.valueToPointsMap = opts.valueToPointsMap;
    this.dealTerm = opts.dealTerm;
  }
}
