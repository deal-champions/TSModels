import { PlayerViewpoint } from './PlayerViewpoint';
import { SerializableClass } from '../serializer-helpers/SerializableClass';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Logger } from '../logger';

@JsonObject('Player')
export class Player extends SerializableClass {
  @JsonProperty('name')
  public name: string;

  /** The PlayerViewpoint for this player for a specific scenario */
  @JsonProperty('viewpoint', PlayerViewpoint)
  public viewpoint: PlayerViewpoint;

  constructor(name?: string, viewpoint?: PlayerViewpoint) {
    super();
    if (!name || !viewpoint) {
      Logger.warnUninitializedClass();
      this.name = null!;
      this.viewpoint = null!;
      return;
    }
    this.name = name;
    this.viewpoint = viewpoint;
  }
}
