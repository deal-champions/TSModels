import { DealTerm, NumberTerm, ListTerm, ComplexTerm } from './DealTerms';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Logger } from './logger';

/** A constant represnting a NO DEAL for a Negotiation Position. */
export const NO_DEAL = Number.POSITIVE_INFINITY;
/**
 * This is the viewpoint that a player can take in a negotiation - e.g. buyer, seller, etc.
 * It describes how the different values of the [DealTerm]s affect this player's points
 * E.g. what is acceptable and what is not, what deal terms give you more points, how much etc.
 */

@JsonObject('TermViewpoint')
export abstract class TermViewpoint<T extends DealTerm = DealTerm> {
  /** The current value of points for this Term. It may return `noDeal` if the value is out of bounds. */
  abstract get points(): number;

  /** The DealTerm for this TermViewpoint */
  @JsonProperty('dealTerm')
  readonly dealTerm: T | null;

  /** Used for serialization, to know the type */
  @JsonProperty('$', String)
  private _type: string;

  constructor(dealTerm?: T) {
    this.dealTerm = dealTerm || null;
    this._type = new.target.name;
  }
}

export class NumberTermViewpoint extends TermViewpoint<NumberTerm> {
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
  constructor(
    dealTerm: NumberTerm,
    /** If true - higher value is better. If false - lower value is better */
    public higherIsBetter: boolean,
    /**
     * This is the reference point for the caluclation of the value of this term. It can be 0.
     * For example, the reference point may depend on some sort of analysis or something else.
     */
    public referencePoint = 0,
    /** The multiplier for each point in the vlaue of the term. */
    public multiplier = 1,
    /** The min value of the term if any. Anything below this will result in NO-DEAL */
    public minAcceptableValue: number | null = null,
    /** The max value of the term if any. Anything above this will result in NO-DEAL */
    public maxAcceptableValue: number | null = null
  ) {
    super(dealTerm);
  }
}
@JsonObject('ListTermViewpoint')
export class ListTermViewpoint extends TermViewpoint<ListTerm> {
  get points(): number {
    if (!this.dealTerm || !this.valueToPointsMap) {
      return 0;
    }
    // We have guaranteed that there will be always be a points value for each possible value
    return this.valueToPointsMap.get(this.dealTerm.value as string)!;
  }

  /** A mapping between the possible values of the ListTerm and the points */
  @JsonProperty('valueToPointsMap')
  readonly valueToPointsMap: Map<string, number> = new Map();

  @JsonProperty('dealTerm', ListTerm)
  get _dealTerm(): ListTerm | null {
    return this.dealTerm;
  }

  constructor(dealTerm?: ListTerm, valueToPointsMap?: Map<string, number>) {
    super(dealTerm);
    if (!dealTerm || !valueToPointsMap) {
      Logger.warnUninitializedClass();
      return;
    }

    // Guarantee that there is a point value for each possibel value
    const vpmKeys = [...valueToPointsMap.keys()];
    let invalidKey = vpmKeys.find(k => dealTerm.possibleValues.indexOf(k) < 0);

    if (invalidKey != null) {
      throw TypeError(
        `All keys must be one of ${dealTerm.possibleValues}. "${invalidKey}" provided`
      );
    }

    if (vpmKeys.length !== dealTerm.possibleValues.length) {
      throw TypeError(
        `You need to specify values for all possible keys: ${dealTerm.possibleValues}.` +
          `You have missed: ${dealTerm.possibleValues.filter(v => vpmKeys.indexOf(v) < 0)}`
      );
    }

    this.valueToPointsMap = valueToPointsMap;
  }
}

export enum PointsCalculationFunction {
  multiplication,
  addition
}

const PointsFunctionImplementationMap = {
  [PointsCalculationFunction.multiplication]: (acc: number, val: number) => acc * val,
  [PointsCalculationFunction.addition]: (acc: number, val: number) => acc + val
};

const PointsFunctionAccumulatorInitialValueMap = {
  [PointsCalculationFunction.multiplication]: 1,
  [PointsCalculationFunction.addition]: 0
};

export class ComplexTermViewpoint extends TermViewpoint<ComplexTerm> {
  get points(): number {
    return this.termViewpointsForTerms.reduce(
      (acc, vp) => PointsFunctionImplementationMap[this.pointsFunction](acc, vp.points),
      PointsFunctionAccumulatorInitialValueMap[this.pointsFunction]
    );
  }

  /**
   * A list of [TermViewpoint]s, which must be associated with the DealTerms from the
   * `ComplexTerm`. The order must be the same as well.
   */
  readonly termViewpointsForTerms: TermViewpoint<DealTerm>[] = [];

  /** The function to use when calculating the points from individual complex terms */
  readonly pointsFunction: PointsCalculationFunction = PointsCalculationFunction.addition;

  constructor(
    dealTerm?: ComplexTerm,
    termViewpointsForTerms?: TermViewpoint<DealTerm>[],
    pointsFunction?: PointsCalculationFunction
  ) {
    super(dealTerm);
    if (!dealTerm || !termViewpointsForTerms || !pointsFunction) {
      Logger.warnUninitializedClass();
      return;
    }
    for (let i = 0; i < dealTerm.terms.length; i++) {
      if (termViewpointsForTerms[i].dealTerm !== dealTerm.terms[i]) {
        throw TypeError(
          'The order of TermViewpoints and their associated DealTerms must match the order of the DealTerms inside the Complex Term'
        );
      }
    }
    this.pointsFunction = pointsFunction;
    this.termViewpointsForTerms = termViewpointsForTerms;
  }
}

export class PlayerViewpoint {
  constructor(
    /**
     * Best Alternative To Negotiated Agreement (BATNA)
     * This is essentially your alternative.
     * Let's say you're selling a house and you already have an offer worth $300,000. This would be your BATNA.
     * You should only make the new deal if it exceeds your BATNA (e.g. if the value of the new deal is > $300,000)
     *
     * NOTE: The value of the deal is computed as the total sum of the value of all DealTerms
     */
    public batna: number,

    // /// Analysis, datapoints and other objects that will help the parties to analyse the situation
    // List<DealContextObject> dealContext;

    /** The position for each of the terms of the context. */
    public termViewpoints: TermViewpoint[]
  ) {}

  /**
   * The current points for this player, given the value of all the terms.
   * It will be `noDeal` if any of the terms' value is a `noDeal`
   */
  get currentPoints() {
    return this.termViewpoints.reduce((acc, term) => acc + term.points, 0);
  }
}
