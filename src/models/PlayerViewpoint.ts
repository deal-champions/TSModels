import {
  TermViewpoint,
  NumberTermViewpoint,
  ListTermViewpoint
} from './term-viewpoints/TermViewpoints';
import { Scenario } from './Scenario';
import { JsonObject, JsonProperty } from 'json2typescript';
import { SerializableClass } from '../serializer-helpers/SerializableClass';
import { Logger } from '../logger';

@JsonObject('PlayerViewpoint')
export class PlayerViewpoint extends SerializableClass {
  /**
   * Best Alternative To Negotiated Agreement (BATNA)
   * This is essentially your alternative.
   * Let's say you're selling a house and you already have an offer worth $300,000. This would be your BATNA.
   * You should only make the new deal if it exceeds your BATNA (e.g. if the value of the new deal is > $300,000)
   *
   * NOTE: The value of the deal is computed as the total sum of the value of all DealTerms
   */
  @JsonProperty('batna', Number)
  public batna: number;

  // /// Analysis, datapoints and other objects that will help the parties to analyse the situation
  // List<DealContextObject> dealContext;

  // We need this to be able to serialize this object correctly.
  @JsonProperty('_numberTermsViewpoints', [NumberTermViewpoint])
  private _numberTermsViewpoints: NumberTermViewpoint[] = [];

  @JsonProperty('_listTermsViewpoints', [ListTermViewpoint])
  private _listTermsViewpoints: ListTermViewpoint[] = [];

  /** The viewpoint for each of the terms of the context. */
  public get termsViewpoints(): TermViewpoint[] {
    return [...this._numberTermsViewpoints, ...this._listTermsViewpoints];
  }

  public set termsViewpoints(newTerms: TermViewpoint[]) {
    this._numberTermsViewpoints = [];
    this._listTermsViewpoints = [];
    newTerms.forEach(t => {
      switch ((t as Object).constructor.name) {
        case 'NumberTermViewpoint':
          this._numberTermsViewpoints.push(t as NumberTermViewpoint);
          break;
        case 'ListTermViewpoint':
          this._listTermsViewpoints.push(t as ListTermViewpoint);
          break;
      }
    });
  }

  /**
   * The current points for this player, given the value of all the terms.
   * It will be `noDeal` if any of the terms' value is a `noDeal`
   */
  get currentPoints() {
    return this.termsViewpoints.reduce((acc, term) => acc + term.points, 0);
  }

  /** The scenario that this Viewpoint is for */
  @JsonProperty('scenario', Scenario)
  public scenario: Scenario;

  constructor(opts?: { batna: number; termsViewpoints: TermViewpoint[]; scenario: Scenario }) {
    super();
    if (!opts) {
      Logger.warnUninitializedClass();
      this.batna = 0;
      this.scenario = null!;
      return;
    }
    this.batna = opts.batna;
    this.termsViewpoints = opts.termsViewpoints;
    this.scenario = opts.scenario;
  }
}
