import { DealTerm, NumberTerm, ListTerm } from './deal-terms/DealTerms';
import { SerializableClass } from '../serializer-helpers/SerializableClass';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Logger } from '../logger';

@JsonObject('Scenario')
export class Scenario extends SerializableClass {
  /** The main name of the scenario */
  @JsonProperty('title')
  public title: string;

  /** A short description max 2 senteces. ?? MAYBE max x chars? To be shown below the title */
  @JsonProperty('shortDescription')
  public shortDescription: string | null;

  /** The required participants to start this scenario */
  @JsonProperty('requiredParticipants')
  public requiredParticipants: number;

  /** All the terms that could be negotiated */
  public get termsToNegotiate(): DealTerm[] {
    return [];
  }

  // We need this to be able to serialize this object correctly. Because there is no
  // way to automatically guess the type of a property
  public set termsToNegotiate(newTerms: DealTerm[]) {
    this._numberTerms = [];
    this._listTerms = [];
    newTerms.forEach(t => {
      switch ((t as Object).constructor.name) {
        case 'NumberTerm':
          this._numberTerms.push(t as NumberTerm);
          break;
        case 'ListTerm':
          this._listTerms.push(t as ListTerm);
          break;
      }
    });
  }

  // We need this to be able to serialize this object correctly.
  @JsonProperty('_numberTerms', [NumberTerm])
  private _numberTerms: NumberTerm[] = [];

  @JsonProperty('_listTerms', [ListTerm])
  private _listTerms: ListTerm[] = [];

  constructor(opts?: {
    title: string;
    shortDescription?: string;
    requiredParticipants: number;
    termsToNegotiate: DealTerm[];
  }) {
    super();
    if (!opts) {
      Logger.warnUninitializedClass();
      this.requiredParticipants = null!;
      this.title = null!;
      this.shortDescription = null!;
      return;
    }
    this.title = opts.title;
    this.shortDescription = opts.shortDescription || null!;
    this.requiredParticipants = opts.requiredParticipants;
    this.termsToNegotiate = opts.termsToNegotiate;
  }
}
